import { connect } from 'react-redux';
import Header from '../components/Header';
import { hideGlobalError } from '../actions/ui';

const mapStateToProps = state => ({
    globalError: state.ui.globalError,
});

export default connect(mapStateToProps,  {
    hideGlobalError
})(Header);
