/* eslint-disable react/prop-types */

const PrimaryButton = ({children}) => {
    return (
        <button className="btn btn-primary font-bold text-white uppercase bg-gradient-to-r from-secondary to-primary">{children}</button>

    );
};

export default PrimaryButton;