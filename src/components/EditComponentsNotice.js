import React from 'react';

const EditComponentsNotice = ({ objectName }) => {
    return (
        <div className="editComponentsText">
            <div>You don't have a story selected.</div>
            <div>{`Hit the 'Edit Components' button of a story to begin creating a ${objectName}`}</div>
        </div>
    );
};

export default EditComponentsNotice;
