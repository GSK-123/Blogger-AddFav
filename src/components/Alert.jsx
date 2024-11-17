import { Snackbar } from '@mui/material';
import { memo } from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => {
    const {
        isOpen = false,
        hideDuration = 6000,
        handleCLose,
        message = 'Message',
        location = { vertical: 'bottom', horizontal: 'left' },
    } = props.alertConfig;

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={hideDuration}
            onClose={handleCLose}
            message={message}
            anchorOrigin={location}
        />
    );
};

Alert.propTypes = {
    alertConfig: PropTypes.shape({
        isOpen: PropTypes.bool,
        hideDuration: PropTypes.number,
        handleCLose: PropTypes.func,
        message: PropTypes.string,
        location: PropTypes.shape({
            vertical: PropTypes.oneOf(['top', 'bottom']).isRequired,
            horizontal: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
        }),
    }).isRequired,
};

export default memo(Alert);
