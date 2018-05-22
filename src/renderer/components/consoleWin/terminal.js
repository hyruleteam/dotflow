import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeTerminalStatus} from '../../actions/consoleWin';

import styles from './index.less';

const Terminal = (props) => {
  const {terminalStatus} = props;
  return (
    <pre className={styles['m-console-info']} dangerouslySetInnerHTML={{__html:terminalStatus}}>
    </pre>
  );
}

const mapStateToProps = store => {
		return {terminalStatus:store.consoleWin.terminalStatus};
};

const mapDispatchToProps = dispatch => {
		return {
      changeTerminalStatus: bindActionCreators(changeTerminalStatus, dispatch),
		};
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);