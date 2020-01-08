it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProfileEdit number={0} />, div);
    ReactDOM.unmountComponentAtNode(div);
});