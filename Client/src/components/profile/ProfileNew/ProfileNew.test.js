it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProfileNew number={0} />, div);
    ReactDOM.unmountComponentAtNode(div);
});