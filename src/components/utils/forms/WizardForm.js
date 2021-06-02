import React, { useState } from 'react';

const WizardForm = ({ children, onSubmit }) => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  return (
    <div>
      {page === 1 && React.cloneElement(children[0], { onSubmit: nextPage })}
      {page === 2 &&
        React.cloneElement(children[1], {
          previousPage: previousPage,
          onSubmit: nextPage,
        })}
      {page === 3 &&
        React.cloneElement(children[2], {
          previousPage: previousPage,
          onSubmit: nextPage,
        })}
      {page === 4 &&
        React.cloneElement(children[3], {
          previousPage: previousPage,
          onSubmit: onSubmit,
        })}
    </div>
  );
};

export default WizardForm;
