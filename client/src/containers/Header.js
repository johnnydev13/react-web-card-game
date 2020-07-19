import { connect } from 'react-redux';
import Header from '../components/Header';
import { hideGlobalError, hideGameResults } from '../actions/ui';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    globalError: state.ui.globalError,
    gameResults: state.ui.gameResults,
    login:       state.user.login,
});

export default withRouter(connect(mapStateToProps,  {
    hideGlobalError,
    hideGameResults,
})(Header));
