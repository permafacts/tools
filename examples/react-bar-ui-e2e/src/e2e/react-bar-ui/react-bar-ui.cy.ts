describe('react-bar-ui: ReactBarUi component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=reactbarui--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ReactBarUi!');
    });
});
