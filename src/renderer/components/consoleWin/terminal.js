import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeTerminalStatus} from '../../actions/consoleWin';

import styles from './index.less';

const Terminal = (props) => {
  const {terminalContent} = props;
  return (
    <pre className={styles['m-console-info']} dangerouslySetInnerHTML={{__html:terminalContent}}>
    </pre>
  );
}

const mapStateToProps = store => {
		return {terminalContent:store.consoleWin.terminalContent};
};

const mapDispatchToProps = dispatch => {
		return {
      changeTerminalStatus: bindActionCreators(changeTerminalStatus, dispatch),
		};
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);