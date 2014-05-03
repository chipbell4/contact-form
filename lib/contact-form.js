var ContactForm = function(options) {
	var defaults = {
		/**
		 * The main container for the contact form. Used to scope dom
		 * queries
		 */
		container: '.contact',

		/**
		 * An array of field definitions. Here's an example
		 * {
		 * name: name attribute, for selecting the item
		 * regex: A regex for validation
		 * message: The message displayed when the field is invalid
		 * val_method: The jquery method to retrieve the value (defaults to val)
		 * }
		 */
		fields: [],

		/**
		 * The url to post to when sending the email
		 */
		url: '/',

		/**
		 * The button that sends the email
		 */
		submit: 'button',

		/**
		 * The container for any sort of messages
		 */
		message_container: '.alert',
	};

	options = $.extend(true, {}, defaults, options);

	var $container = $(options.container);
	var field_count = options.fields.length;

	// Returns a jquery selector to a field
	var select_field = function(field) {
		return $('[name=' + field.name + ']', $container);
	};

	// Returns the value of the provided field
	var field_value = function(field) {
		var val_method = field.val_method || 'val';
		return select_field(field)[val_method]();
	};

	// Validates a single field
	var validate_field = function(field) {
		return field.regex.test(field_value(field));
	};

	// Validates all fields and sets the message if there are errors. Returns a boolean with the result
	var validate_all_fields = function() {
		for(var i=0; i<field_count; i++) {
			if(!validate_field(options.fields[i])) {
				$(options.message_container, $container).html(options.fields[i].message);
				return false;
			}
		}
		$(options.message_container, $container).html('');
		return true;
	};

	// Mark the submit button as disabled
	$(options.submit, $container).attr('disabled', true);

	// A function to toggle the submit button depending on validity of the form
	var toggle_button = function() {
		if(!validate_all_fields(options.fields)) {
			$(options.submit, $container).attr('disabled', true);
		}
		else {
			$(options.submit, $container).removeAttr('disabled');
		}
	};

	// For each of the input fields, listen for change events to revalidate and allow submits
	for(var i=0; i<field_count; i++) {
		select_field(options.fields[i]).on('keyup', toggle_button);
	}

	// Lastly, tell the submit button to post the the ajax form
	$(options.submit, $container).on('click', function() {
		// serialize the form and submit
		var serialized_form = {};
		for(var i=0; i<field_count; i++) {
			serialized_form[ options.fields[i].name ] = field_value(options.fields[i]);
		}

		$.ajax({
			url: options.url,
			method: 'POST',
			data: serialized_form,
			success: function() {
				$(options.message_container, $container).html('Your email sent successfully');
				$('input, textarea, select', $container).attr('disabled', 'true');
				$(options.submit, $container).attr('disabled', 'true');
			},
			error: function() {
				$(options.message_container, $container).html('Your email did not send successfully...');
			},
		});

	});
};
