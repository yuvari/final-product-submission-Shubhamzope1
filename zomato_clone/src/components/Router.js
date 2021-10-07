import { BrowserRouter, Route } from 'react-router-dom';

import Home from './home';
import Filter from './Filter';
import details from './details';
import Header from './Header';
import Account from './Account';

function Router() {
    return (
        <BrowserRouter>
          <Header />
            <Route exact path="/" component={Home}></Route>
            <Route path="/filter" component={Filter}></Route>
            <Route path="/details" component={details}></Route>
            <Route path="/account" component={Account}></Route>
        </BrowserRouter>
    )
}

export default Router;