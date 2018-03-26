import {update} from '../shan';

export function updateVComponent(prevComponent, nextComponent) {
  //get the instance. This is Component. It also holds the props and _currentElement
  const { _instance } = prevComponent;
  const { _currentElement } = _instance;

  //get the new and old props
  const prevProps = prevComponent.props;
  const nextProps = nextComponent.props;

  nextComponent.dom = prevComponent.dom;
  nextComponent._instance = _instance;
  nextComponent._instance.props = nextProps;


  if (_instance.shouldComponentUpdate()) {
    const prevRenderedElement = _currentElement;
    const nextRenderedElement = _instance.render();

    //finaly save the nextRenderedElement for the next iteration!
    nextComponent._instance._currentElement = nextRenderedElement;

    //call update
    update(prevRenderedElement, nextRenderedElement, _instance._parentNode);
  }
}