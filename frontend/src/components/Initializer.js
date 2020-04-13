import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

class Initializer extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
      const { pathname } = this.props.location;
      ReactGA.set({ page: pathname });
      ReactGA.pageview(pathname);
    }
  }

  componentDidMount() {
    ReactGA.initialize('UA-134690918-1');
    const { pathname } = this.props.location;
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(Initializer);
