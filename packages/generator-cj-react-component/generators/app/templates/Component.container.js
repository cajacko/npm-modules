/**
 * This file is only responsible for connecting the component to the redux
 * store and react router. The component should not be able to access the store
 * or router from any other file.
 *
 * This file can:
 * - Passes props from the redux store to the component
 * - Passes functions as props to the component which dispatch actions
 * - Connects the component with react router and passes the routers props to
 *   the component
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Component from 'components/Component/Component.component';
import { exampleAction  } from 'actions/exampleActions';

/**
 * Get props from the redux store, transform/make use of them and then return
 * an object that will be passed as merged props to the component.
 *
 * Explain custome behaviour here
 *
 * @param  {Object} state The redux state from the store
 * @param  {Object} props The props passed to the component
 * @return {Object}       Additional props to pass and merge with the component
 */
const mapStateToProps = ({ propFromStore }, { propPassedToComponent }) => {
  // Transform props from the store here as necessary
  const propToPass = propFromStore;

  return {
    propToPass
  };
}

/**
 * Pass functions as props to the component, which can dispatch actions to the
 * redux store.
 *
 * Explain custome behaviour here
 *
 * @param  {Function} dispatch The redux dispatch function
 * @param  {Object}   props    The props passed to the component
 * @return {Object}            Additional props to pass and merge with the
 *                             component
 */
const mapDispatchToProps = (dispatch, { propPassedToComponent }) => ({
  action: (paramFromFuncCall) => dispatch(action(paramFromFuncCall, propPassedToComponent)),
});

// Connect the component to redux via "connect" and with react router via
// "withRouter"
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component));
