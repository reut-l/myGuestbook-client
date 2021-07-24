import React, { useState, useRef, useEffect } from 'react';
import $ from 'jquery';
import ImageEditor from 'tui-image-editor';
import colorPicker from 'tui-color-picker';
import util from 'tui-code-snippet';
import './imageEditor.css';
import { dataURLtoBlob } from './utils';

const CustomImageEditor = ({ onImageSave, initialImage }) => {
  const [pictures, setPictures] = useState(
    localStorage.getItem('postPictures')
      ? JSON.parse(localStorage.getItem('postPictures'))
      : []
  );

  const picturesRef = useRef([]);
  const itemsRef = useRef({});
  const editorRef = useRef(null);

  useEffect(() => {
    var MAX_RESOLUTION = 3264 * 2448; // 8MP (Mega Pixel)

    var supportingFileAPI = !!(
      window.File &&
      window.FileList &&
      window.FileReader
    );
    var rImageType = /data:(image\/.+);base64,/;
    var shapeOpt = {
      fill: '#fff',
      stroke: '#000',
      strokeWidth: 10,
    };
    var activeObjectId;

    // Selector of image editor controls
    var submenuClass = '.submenu';
    var hiddenmenuClass = '.hiddenmenu';

    var $controls = $('.tui-image-editor-controls');
    var $menuButtons = $controls.find('.menu-button');
    var $submenuButtons = $controls.find('.submenu-button');
    var $btnShowMenu = $controls.find('.btn-prev');
    var $msg = $controls.find('.msg');

    var $subMenus = $controls.find(submenuClass);
    var $hiddenMenus = $controls.find(hiddenmenuClass);

    // Image editor controls - top menu buttons
    var $inputImage = itemsRef.current['input-image-file'];
    var $btnSave = itemsRef.current['btn-save'];

    var $btnUndo = itemsRef.current['btn-undo'];
    var $btnRedo = itemsRef.current['btn-redo'];
    var $btnRemoveActiveObject = itemsRef.current['btn-remove-active-object'];

    // Image editor controls - bottom menu buttons
    var $btnCrop = itemsRef.current['btn-crop'];
    var $btnAddText = itemsRef.current['btn-add-text'];
    var $btnGrayscaleFilter = itemsRef.current['btn-grayscale-filter'];
    var $btnInvertFilter = itemsRef.current['btn-invert-filter'];
    var $btnSepiaFilter = itemsRef.current['btn-sepia-filter'];
    var $btnEmbossFilter = itemsRef.current['btn-emboss-filter'];

    // Image editor controls - bottom submenu buttons
    var $btnApplyCrop = itemsRef.current['btn-apply-crop'];
    var $btnFlipX = itemsRef.current['btn-flip-x'];
    var $btnFlipY = itemsRef.current['btn-flip-y'];
    var $btnRotateClockwise = itemsRef.current['btn-rotate-clockwise'];
    var $btnRotateCounterClockWise =
      itemsRef.current['btn-rotate-counter-clockwise'];
    var $btnAddArrowIcon = itemsRef.current['btn-add-arrow-icon'];
    var $btnAddCancelIcon = itemsRef.current['btn-add-cancel-icon'];
    var $btnAddCustomIcon = itemsRef.current['btn-add-custom-icon'];
    var $btnFreeDrawing = itemsRef.current['btn-free-drawing'];
    var $btnLineDrawing = itemsRef.current['btn-line-drawing'];
    var $btnAddRect = itemsRef.current['btn-add-rect'];
    var $btnAddSquare = itemsRef.current['btn-add-square'];
    var $btnAddEllipse = itemsRef.current['btn-add-ellipse'];
    var $btnAddCircle = itemsRef.current['btn-add-circle'];
    var $btnAddTriangle = itemsRef.current['btn-add-circle'];
    var $btnChangeTextStyle = $('.btn-change-text-style');

    // Image editor controls - etc.
    var $inputTextSizeRange = itemsRef.current['input-text-size-range'];
    var $inputBrushWidthRange = itemsRef.current['input-brush-range'];
    var $inputStrokeWidthRange = itemsRef.current['input-stroke-range'];
    var $inputCheckTransparent = itemsRef.current['input-check-transparent'];

    // Colorpicker
    var iconColorpicker = colorPicker.create({
      container: itemsRef.current['tui-icon-color-picker'],
      color: '#000000',
    });

    var textColorpicker = colorPicker.create({
      container: itemsRef.current['tui-text-color-picker'],
      color: '#000000',
    });

    var brushColorpicker = colorPicker.create({
      container: itemsRef.current['tui-brush-color-picker'],
      color: '#000000',
    });

    var shapeColorpicker = colorPicker.create({
      container: itemsRef.current['tui-shape-color-picker'],
      color: '#000000',
    });

    // Create image editor
    var imageEditor = new ImageEditor('.tui-image-editor', {
      cssMaxWidth: document.documentElement.clientWidth,
      cssMaxHeight: document.documentElement.clientHeight,
      selectionStyle: {
        cornerSize: 50,
        rotatingPointOffset: 100,
      },
    });

    var $displayingSubMenu, $displayingHiddenMenu;

    function hexToRGBa(hex, alpha) {
      var r = parseInt(hex.slice(1, 3), 16);
      var g = parseInt(hex.slice(3, 5), 16);
      var b = parseInt(hex.slice(5, 7), 16);
      var a = alpha || 1;

      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }

    // function base64ToBlob(data) {
    //   var mimeString = '';
    //   var raw, uInt8Array, i, rawLength;

    //   raw = data.replace(rImageType, function (header, imageType) {
    //     mimeString = imageType;

    //     return '';
    //   });

    //   raw = atob(raw);
    //   rawLength = raw.length;
    //   uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

    //   for (i = 0; i < rawLength; i += 1) {
    //     uInt8Array[i] = raw.charCodeAt(i);
    //   }

    //   return new Blob([uInt8Array], { type: mimeString });
    // }

    function getBrushSettings() {
      var brushWidth = $($inputBrushWidthRange).val();
      var brushColor = brushColorpicker.getColor();

      return {
        width: brushWidth,
        color: hexToRGBa(brushColor, 0.5),
      };
    }

    function activateShapeMode() {
      imageEditor.stopDrawingMode();
    }

    function activateIconMode() {
      imageEditor.stopDrawingMode();
    }

    function activateTextMode() {
      if (imageEditor.getDrawingMode() !== 'TEXT') {
        imageEditor.stopDrawingMode();
        imageEditor.startDrawingMode('TEXT');
      }
    }

    function setTextToolbar(obj) {
      var fontSize = obj.fontSize;
      var fontColor = obj.fill;

      $($inputTextSizeRange).val(fontSize);
      textColorpicker.setColor(fontColor);
    }

    function setIconToolbar(obj) {
      var iconColor = obj.fill;

      iconColorpicker.setColor(iconColor);
    }

    function setShapeToolbar(obj) {
      var strokeColor, fillColor, isTransparent;
      var colorType = $('[name="select-color-type"]:checked').val();

      if (colorType === 'stroke') {
        strokeColor = obj.stroke;
        isTransparent = strokeColor === 'transparent';

        if (!isTransparent) {
          shapeColorpicker.setColor(strokeColor);
        }
      } else if (colorType === 'fill') {
        fillColor = obj.fill.color;
        isTransparent = fillColor === 'transparent';

        if (!isTransparent) {
          shapeColorpicker.setColor(fillColor);
        }
      }

      $($inputCheckTransparent).prop('checked', isTransparent);
      $($inputStrokeWidthRange).val(obj.strokeWith);
    }

    function showSubMenu(type) {
      var index;

      switch (type) {
        case 'shape':
          index = 3;
          break;
        case 'icon':
          index = 4;
          break;
        case 'text':
          index = 5;
          break;
        default:
          index = 0;
      }

      $displayingSubMenu.hide();
      $displayingHiddenMenu.hide();

      $displayingSubMenu = $menuButtons
        .eq(index)
        .parent()
        .find(submenuClass)
        .show();
    }

    // Bind custom event of image editor
    imageEditor.on({
      undoStackChanged: function (length) {
        if (length) {
          $($btnUndo).removeClass('disabled');
        } else {
          $($btnUndo).addClass('disabled');
        }
      },
      redoStackChanged: function (length) {
        if (length) {
          $($btnRedo).removeClass('disabled');
        } else {
          $($btnRedo).addClass('disabled');
        }
      },
      objectScaled: function (obj) {
        if (obj.type === 'text') {
          $($inputTextSizeRange).val(obj.fontSize);
        }
      },
      objectActivated: function (obj) {
        activeObjectId = obj.id;
        if (
          obj.type === 'rect' ||
          obj.type === 'circle' ||
          obj.type === 'triangle'
        ) {
          showSubMenu('shape');
          setShapeToolbar(obj);
          activateShapeMode();
        } else if (obj.type === 'icon') {
          showSubMenu('icon');
          setIconToolbar(obj);
          activateIconMode();
        } else if (obj.type === 'text') {
          showSubMenu('text');
          setTextToolbar(obj);
          activateTextMode();
        }
      },
    });

    // Image editor controls action
    $menuButtons.on('click', function () {
      $displayingSubMenu = $(this).parent().find(submenuClass).show();
      $displayingHiddenMenu = $(this).parent().find(hiddenmenuClass);
    });

    $submenuButtons.on('click', function () {
      $displayingHiddenMenu.hide();
      $displayingHiddenMenu = $(this).parent().find(hiddenmenuClass).show();
    });

    $btnShowMenu.on('click', function () {
      $displayingSubMenu.hide();
      $displayingHiddenMenu.hide();
      $msg.show();

      imageEditor.stopDrawingMode();
    });

    // Image load action
    $($inputImage).on('change', function (event) {
      var file;
      var img;
      var resolution;

      if (!supportingFileAPI) {
        alert('This browser does not support file-api');
      }

      file = event.target.files[0];

      if (file) {
        img = new Image();

        img.onload = function () {
          resolution = this.width * this.height;

          if (resolution <= MAX_RESOLUTION) {
            imageEditor.loadImageFromFile(file).then(function () {
              imageEditor.clearUndoStack();
            });
          } else {
            alert(
              "Loaded image's resolution is too large!\nRecommended resolution is 3264 * 2448!"
            );
          }

          URL.revokeObjectURL(file);
        };

        img.src = URL.createObjectURL(file);
      }
    });

    // Undo action
    $($btnUndo).on('click', function () {
      if (!$(this).hasClass('disabled')) {
        imageEditor.undo();
      }
    });

    // Redo action
    $($btnRedo).on('click', function () {
      if (!$(this).hasClass('disabled')) {
        imageEditor.redo();
      }
    });

    // Remove active object action
    $($btnRemoveActiveObject).on('click', function () {
      imageEditor.removeObject(activeObjectId);
    });

    // Download action
    $($btnSave).on('click', () => processSaveImage(imageEditor));

    // Crop menu action
    $($btnCrop).on('click', function () {
      imageEditor.startDrawingMode('CROPPER');
    });

    $($btnApplyCrop).on('click', function () {
      imageEditor.crop(imageEditor.getCropzoneRect()).then(function () {
        imageEditor.stopDrawingMode();
        $subMenus.removeClass('show');
        $hiddenMenus.removeClass('show');
      });
    });

    // Orientation menu action
    $($btnRotateClockwise).on('click', function () {
      imageEditor.rotate(90);
    });

    $($btnRotateCounterClockWise).on('click', function () {
      imageEditor.rotate(-90);
    });

    $($btnFlipX).on('click', function () {
      imageEditor.flipX();
    });

    $($btnFlipY).on('click', function () {
      imageEditor.flipY();
    });

    // Icon menu action
    $($btnAddArrowIcon).on('click', function () {
      imageEditor.addIcon('arrow');
    });

    $($btnAddCancelIcon).on('click', function () {
      imageEditor.addIcon('cancel');
    });

    $($btnAddCustomIcon).on('click', function () {
      imageEditor.addIcon('customArrow');
    });

    iconColorpicker.on('selectColor', function (event) {
      imageEditor.changeIconColor(activeObjectId, event.color);
    });

    // Text menu action
    $($btnAddText).on('click', function () {
      var initText = 'DoubleClick';

      imageEditor.startDrawingMode('TEXT');
      imageEditor.addText(initText, {
        styles: {
          fontSize: parseInt($($inputTextSizeRange).val(), 10),
        },
      });
    });

    $btnChangeTextStyle.on('click', function () {
      var styleType = $(this).attr('data-style-type');
      var styleObj = {};
      var styleObjKey;

      switch (styleType) {
        case 'bold':
          styleObjKey = 'fontWeight';
          break;
        case 'italic':
          styleObjKey = 'fontStyle';
          break;
        case 'underline':
          styleObjKey = 'underline';
          break;
        case 'left':
          styleObjKey = 'textAlign';
          break;
        case 'center':
          styleObjKey = 'textAlign';
          break;
        case 'right':
          styleObjKey = 'textAlign';
          break;
        default:
          styleObjKey = '';
      }

      styleObj[styleObjKey] = styleType;

      imageEditor.changeTextStyle(activeObjectId, styleObj);
    });

    $($inputTextSizeRange).on('change', function () {
      imageEditor.changeTextStyle(activeObjectId, {
        fontSize: parseInt($(this).val(), 10),
      });
    });

    textColorpicker.on('selectColor', function (event) {
      imageEditor.changeTextStyle(activeObjectId, {
        fill: event.color,
      });
    });

    // Draw line menu action
    $($btnFreeDrawing).on('click', function () {
      var settings = getBrushSettings();

      imageEditor.stopDrawingMode();
      imageEditor.startDrawingMode('FREE_DRAWING', settings);
    });

    $($btnLineDrawing).on('click', function () {
      var settings = getBrushSettings();

      imageEditor.stopDrawingMode();
      imageEditor.startDrawingMode('LINE_DRAWING', settings);
    });

    $($inputBrushWidthRange).on('change', function () {
      imageEditor.setBrush({
        width: parseInt($(this).val(), 10),
      });
    });

    brushColorpicker.on('selectColor', function (event) {
      imageEditor.setBrush({
        color: hexToRGBa(event.color, 0.5),
      });
    });

    // Add shape menu action
    $($btnAddRect).on('click', function () {
      imageEditor.addShape(
        'rect',
        util.extend(
          {
            width: 500,
            height: 300,
          },
          shapeOpt
        )
      );
    });

    $($btnAddSquare).on('click', function () {
      imageEditor.addShape(
        'rect',
        util.extend(
          {
            width: 400,
            height: 400,
            isRegular: true,
          },
          shapeOpt
        )
      );
    });

    $($btnAddEllipse).on('click', function () {
      imageEditor.addShape(
        'circle',
        util.extend(
          {
            rx: 300,
            ry: 200,
          },
          shapeOpt
        )
      );
    });

    $($btnAddCircle).on('click', function () {
      imageEditor.addShape(
        'circle',
        util.extend(
          {
            rx: 200,
            ry: 200,
            isRegular: true,
          },
          shapeOpt
        )
      );
    });

    $($btnAddTriangle).on('click', function () {
      imageEditor.addShape(
        'triangle',
        util.extend(
          {
            width: 500,
            height: 400,
            isRegular: true,
          },
          shapeOpt
        )
      );
    });

    $($inputStrokeWidthRange).on('change', function () {
      imageEditor.changeShape(activeObjectId, {
        strokeWidth: parseInt($(this).val(), 10),
      });
    });

    $($inputCheckTransparent).on('change', function () {
      var colorType = $('[name="select-color-type"]:checked').val();
      var isTransparent = $(this).prop('checked');
      var color;

      if (!isTransparent) {
        color = shapeColorpicker.getColor();
      } else {
        color = 'transparent';
      }

      if (colorType === 'stroke') {
        imageEditor.changeShape(activeObjectId, {
          stroke: color,
        });
      } else if (colorType === 'fill') {
        imageEditor.changeShape(activeObjectId, {
          fill: color,
        });
      }
    });

    shapeColorpicker.on('selectColor', function (event) {
      var colorType = $('[name="select-color-type"]:checked').val();
      var isTransparent = $($inputCheckTransparent).prop('checked');
      var color = event.color;

      if (isTransparent) {
        return;
      }

      if (colorType === 'stroke') {
        imageEditor.changeShape(activeObjectId, {
          stroke: color,
        });
      } else if (colorType === 'fill') {
        imageEditor.changeShape(activeObjectId, {
          fill: color,
        });
      }
    });

    $($btnGrayscaleFilter).on('click', function () {
      imageEditor.applyFilter('Grayscale');
    });

    $($btnInvertFilter).on('click', function () {
      imageEditor.applyFilter('Invert');
    });

    $($btnSepiaFilter).on('click', function () {
      imageEditor.applyFilter('Sepia');
    });

    $($btnEmbossFilter).on('click', function () {
      imageEditor.applyFilter('Emboss');
    });

    addListenersToPictures(imageEditor);

    if (initialImage)
      imageEditor.loadImageFromURL(initialImage, 'post').then(function () {
        imageEditor.clearUndoStack();
      });
  }, [pictures]);

  const addListenersToPictures = (editorInstance) => {
    picturesRef.current.map((elRef) =>
      elRef.addEventListener('click', () => {
        const imgSource = elRef.src.replace(/^https:\/\//i, 'http://');
        editorInstance.loadImageFromURL(imgSource, 'photo');
      })
    );
  };

  const processSaveImage = (editorInstance) => {
    const blob = dataURLtoBlob(editorInstance.toDataURL());
    onImageSave(blob);
  };

  return (
    <div>
      {/* Image editor controls - top area */}
      <div className="tui-image-editor-header">
        <div className="menu">
          <span className="button">
            <img
              src="http://localhost:3000/img/icons/openImage.png"
              style={{ marginTop: '5px' }}
              alt="open-img"
            />
            <input
              type="file"
              accept="image/*"
              ref={(e) => (itemsRef.current['input-image-file'] = e)}
            />
          </span>
          <button
            className="button disabled"
            ref={(e) => (itemsRef.current['btn-undo'] = e)}
          >
            <img src="http://localhost:3000/img/icons/undo.png" alt="undo" />
          </button>
          <button
            className="button disabled"
            ref={(e) => (itemsRef.current['btn-redo'] = e)}
          >
            <img src="http://localhost:3000/img/icons/redo.png" alt="redo" />
          </button>
          <button
            className="button"
            ref={(e) => (itemsRef.current['btn-remove-active-object'] = e)}
          >
            <img
              src="http://localhost:3000/img/icons/remove.png"
              alt="remove"
            />
          </button>
          <button
            className="button save-btn"
            ref={(e) => (itemsRef.current['btn-save'] = e)}
          >
            Save
          </button>
        </div>
      </div>
      {/* // Image editor area */}
      <div className="tui-image-editor" ref={editorRef}></div>
      {/* // Image editor controls - bottom area */}
      <div className="tui-image-editor-bottom">
        <div className="tui-image-editor-controls">
          <ul className="scrollable">
            <li className="menu-item">
              <button
                className="menu-button"
                ref={(e) => (itemsRef.current['btn-crop'] = e)}
              >
                <img
                  src="http://localhost:3000/img/icons/crop.png"
                  alt="crop"
                />
              </button>
              <div className="submenu">
                <button className="btn-prev">&lt;</button>
                <ul className="scrollable">
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-apply-crop'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/apply.png"
                        alt="apply"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <button className="menu-button">
                <img
                  src="http://localhost:3000/img/icons/rotate.png"
                  alt="rotate"
                />
              </button>
              <div className="submenu">
                <button className="btn-prev">&lt;</button>
                <ul className="scrollable">
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) =>
                        (itemsRef.current['btn-rotate-clockwise'] = e)
                      }
                    >
                      <img
                        src="http://localhost:3000/img/icons/rotate-clockwise.png"
                        alt="rotate-clockwise"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) =>
                        (itemsRef.current['btn-rotate-counter-clockwise'] = e)
                      }
                    >
                      <img
                        src="http://localhost:3000/img/icons/rotate-counter-clockwise.png"
                        alt="rotate-counter-clockwise"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-flip-x'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/flip-x.png"
                        alt="flip-x"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-flip-y'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/flip-y.png"
                        alt="flip-y"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <button
                className="menu-button"
                ref={(e) => (itemsRef.current['btn-draw-line'] = e)}
              >
                <img
                  src="http://localhost:3000/img/icons/brush.png"
                  alt="crop"
                />
              </button>
              <div className="submenu">
                <button className="btn-prev">&lt;</button>
                <ul className="scrollable">
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-free-drawing'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/free-draw.png"
                        alt="free-drawing"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-line-drawing'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/line-draw.png"
                        alt="line-drawing"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-change-size'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/width.png"
                        alt="crop"
                      />
                    </button>
                    <div className="hiddenmenu">
                      <input
                        ref={(e) => (itemsRef.current['input-brush-range'] = e)}
                        type="range"
                        min="10"
                        max="100"
                        defaultValue="50"
                      />
                    </div>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) =>
                        (itemsRef.current['btn-change-text-color'] = e)
                      }
                    >
                      <img
                        src="http://localhost:3000/img/icons/color-circle.png"
                        alt="color-circle"
                      />
                    </button>
                    <div className="hiddenmenu">
                      <div
                        ref={(e) =>
                          (itemsRef.current['tui-brush-color-picker'] = e)
                        }
                      ></div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <button
                className="menu-button"
                ref={(e) => (itemsRef.current['btn-draw-shape'] = e)}
              >
                <img
                  src="http://localhost:3000/img/icons/shapes.png"
                  alt="shapes"
                />
              </button>
              <div className="submenu">
                <button className="btn-prev">&lt;</button>
                <ul className="scrollable">
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-add-rect'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/rectangular.png"
                        alt="rectangular"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-add-square'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/square.png"
                        alt="square"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-add-ellipse'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/ellipse.png"
                        alt="ellipse"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-add-circle'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/circle.png"
                        alt="circle"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-add-triangle'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/triangle.png"
                        alt="triangle"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-stroke-size'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/width.png"
                        alt="width"
                      />
                    </button>
                    <div className="hiddenmenu">
                      <input
                        ref={(e) =>
                          (itemsRef.current['input-stroke-range'] = e)
                        }
                        type="range"
                        min="1"
                        max="100"
                        defaultValue="10"
                      />
                    </div>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) =>
                        (itemsRef.current['btn-change-shape-color'] = e)
                      }
                    >
                      <img
                        src="http://localhost:3000/img/icons/color-circle.png"
                        alt="color-circle"
                      />
                    </button>
                    <div className="hiddenmenu">
                      <div className="top">
                        <label for="fill-color">
                          <input
                            type="radio"
                            ref={(e) => (itemsRef.current['fill-color'] = e)}
                            name="select-color-type"
                            value="fill"
                            checked="checked"
                          />
                          Fill
                        </label>
                        <label for="stroke-color">
                          <input
                            type="radio"
                            ref={(e) => (itemsRef.current['stroke-color'] = e)}
                            name="select-color-type"
                            value="stroke"
                          />
                          Stroke
                        </label>
                        <label for="input-check-transparent">
                          <input
                            type="checkbox"
                            ref={(e) =>
                              (itemsRef.current['input-check-transparent'] = e)
                            }
                          />
                          Transparent
                        </label>
                      </div>
                      <div
                        ref={(e) =>
                          (itemsRef.current['tui-shape-color-picker'] = e)
                        }
                      ></div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <button className="menu-button">
                <img
                  src="http://localhost:3000/img/icons/star.png"
                  alt="star"
                />
              </button>
              <div className="submenu">
                <button className="btn-prev">&lt;</button>
                <ul className="scrollable">
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-add-arrow-icon'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/arrow.png"
                        alt="arrow"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-add-cancel-icon'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/cross-sign.png"
                        alt="cross-sign"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) =>
                        (itemsRef.current['btn-change-icon-color'] = e)
                      }
                    >
                      <img
                        src="http://localhost:3000/img/icons/color-circle.png"
                        alt="color-circle"
                      />
                    </button>
                    <div className="hiddenmenu">
                      <div
                        ref={(e) =>
                          (itemsRef.current['tui-icon-color-picker'] = e)
                        }
                      ></div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <button
                className="menu-button"
                ref={(e) => (itemsRef.current['btn-add-text'] = e)}
              >
                <img
                  src="http://localhost:3000/img/icons/text.png"
                  alt="text"
                />
              </button>
              <div className="submenu">
                <button className="btn-prev">&lt;</button>
                <ul className="scrollable">
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-change-size'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/font-size.png"
                        alt="font-size"
                      />
                    </button>
                    <div className="hiddenmenu">
                      <input
                        ref={(e) =>
                          (itemsRef.current['input-text-size-range'] = e)
                        }
                        type="range"
                        min="10"
                        max="240"
                        defaultValue="120"
                      />
                    </div>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-change-style'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/bold.png"
                        alt="bold"
                      />
                    </button>
                    <div className="hiddenmenu">
                      <button
                        className="hiddenmenu-button btn-change-text-style"
                        data-style-type="bold"
                      >
                        <img
                          src="http://localhost:3000/img/icons/bold.png"
                          alt="bold"
                        />
                      </button>
                      <button
                        className="hiddenmenu-button btn-change-text-style"
                        data-style-type="italic"
                      >
                        <img
                          src="http://localhost:3000/img/icons/italic.png"
                          alt="italic"
                        />
                      </button>
                      <button
                        className="hiddenmenu-button btn-change-text-style"
                        data-style-type="underline"
                      >
                        <img
                          src="http://localhost:3000/img/icons/underline.png"
                          alt="underline"
                        />
                      </button>
                    </div>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-change-align'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/align-left.png"
                        alt="align-left"
                      />
                    </button>
                    <div className="hiddenmenu">
                      <button
                        className="hiddenmenu-button btn-change-text-style"
                        data-style-type="left"
                      >
                        <img
                          src="http://localhost:3000/img/icons/align-left.png"
                          alt="align-left"
                        />
                      </button>
                      <button
                        className="hiddenmenu-button btn-change-text-style"
                        data-style-type="center"
                      >
                        <img
                          src="http://localhost:3000/img/icons/align-center.png"
                          alt="align-center"
                        />
                      </button>
                      <button
                        className="hiddenmenu-button btn-change-text-style"
                        data-style-type="right"
                      >
                        <img
                          src="http://localhost:3000/img/icons/align-right.png"
                          alt="align-right"
                        />
                      </button>
                    </div>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) =>
                        (itemsRef.current['btn-change-text-color'] = e)
                      }
                    >
                      <img
                        src="http://localhost:3000/img/icons/color-circle.png"
                        alt="color-circle"
                      />
                    </button>
                    <div className="hiddenmenu">
                      <div
                        ref={(e) =>
                          (itemsRef.current['tui-text-color-picker'] = e)
                        }
                      ></div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <button className="menu-button">
                <img
                  src="http://localhost:3000/img/icons/filter.png"
                  alt="filter"
                />
              </button>
              <div className="submenu">
                <button className="btn-prev">&lt;</button>
                <ul className="scrollable">
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) =>
                        (itemsRef.current['btn-grayscale-filter'] = e)
                      }
                    >
                      <img
                        src="http://localhost:3000/img/icons/grayscale-filter.png"
                        alt="grayscale-filter"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-invert-filter'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/invert-filter.png"
                        alt="invert-filter"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-sepia-filter'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/sepia-filter.png"
                        alt="sepia-filter"
                      />
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      className="submenu-button"
                      ref={(e) => (itemsRef.current['btn-emboss-filter'] = e)}
                    >
                      <img
                        src="http://localhost:3000/img/icons/emboss-filter.png"
                        alt="emboss-filter"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="image-editor-pictures-container">
        <div className="images-box">
          {pictures.map((el, i) => (
            <img
              src={el.location}
              key={i}
              ref={(el) => (picturesRef.current[i] = el)}
              alt="event"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomImageEditor;
