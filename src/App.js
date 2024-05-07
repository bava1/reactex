import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from './core/Header/Header';
import Footer from './core/Footer/Footer';
import Homepage from './core/Homepage/Homepage';
import Articles from './components/Articles/Articles';
import Contact from './components/Contact/Contact';
import Tasks from './components/Tasks/Tasks';
import About from './components/About/About';
import Projects from './components/Projects/Projects';

function App() {
  return (
    <div>
      <Header/>
        <Switch>
            <Route path="/" component={Homepage} exact />
            <Route path="/articles" component={Articles} exact />
            <Route path="/contact" component={Contact} exact />
            <Route path="/tasks" component={Tasks} exact />
            <Route path="/about" component={About} exact />
            <Route path="/projects" component={Projects} exact />
        </Switch>
      <Footer/>
    </div>
  );
}

export default App;
