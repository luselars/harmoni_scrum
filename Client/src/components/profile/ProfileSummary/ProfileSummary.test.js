it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProfileSummary number={0} />, div);
    ReactDOM.unmountComponentAtNode(div);
});