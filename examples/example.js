var form = new ContactForm({
	container: 'form',
	fields: [
	{
		name: 'name',
		regex: /.+/,
		message: 'Please provide a name',
	},
	{
		name: 'email',
		regex: /.+/,
		message: 'Please provide an email',
	},
	{
		name: 'number',
		regex: /\d+/,
		message: 'Please provide a number',
	},
	{
		name: 'color',
		regex: /.+/, // TODO: make this use a function
		message: 'Please provide a color',
	}
	],
	url: '#',
	submit: 'button',
	message_container: '#error-messages',
});
