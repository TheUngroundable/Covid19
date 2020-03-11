import React from "react";

const Card = props => {
  return (
    <div className={"card text-white mb-3 ".concat(props.background)}>
      <div className="card-header">{props.title}</div>
      <div className="card-body">
        <h5 className="card-title">{props.count} Cases</h5>
        <p className="card-text">
        </p>
      </div>
    </div>
  );
};

export default Card;
