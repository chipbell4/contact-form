var form = new ContactForm({
	container: 'form',
	fields: [
	{
		name: 'name',
		validate: /.+/,
		message: 'Please provide a name',
	},
	{
		name: 'email',
		validate: /.+/,
		message: 'Please provide an email',
	},
	{
		name: 'number',
		validate: /\d+/,
		message: 'Please provide a number',
	},
	{
		name: 'color',
		validate: function(text) {
			text = text.trim().toLowerCase();
			var colors = ['red', 'blue', 'green', 'orange', 'yellow', 'purple', 
				'brown', 'grey', 'gray', 'pink'];

			return colors.indexOf(text) >= 0;
		},
		message: 'Please provide a color',
	}
	],
	url: '#',
	submit: 'button',
	message_container: '#error-messages',
});
