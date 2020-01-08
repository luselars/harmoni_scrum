it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProfileOrganiser number={0} />, div);
    ReactDOM.unmountComponentAtNode(div);
});