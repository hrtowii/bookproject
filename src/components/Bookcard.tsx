import React, {useState} from 'react';
import './Bookcard.css'

interface BookcardProps {
  imageURL: string;
  title: string;
  description: string;
  author: string;
  notes: string;
}

const Bookcard: React.FC<BookcardProps> = ({ imageURL, title, description, author, notes }) => {
  return (
    <div className="bookcardwrapper">
      <div className='bookimage'>
        <img src={imageURL} alt={title} />
      </div>
      <div className='bookdetails'>
        <h3>{title}</h3>
        <h4>{author}</h4>
        <div className="collapseddescription">
            <p>{description}</p>
        </div>
        <h5>Notes</h5>
        <p>{notes}</p>
      </div>
    </div>
  );
};

export default Bookcard;
