<?php

class acf_field_youtube extends acf_field
{
	// vars
	var $settings, // will hold info such as dir / path
		$defaults; // will hold default field options


	/*
	*  __construct
	*
	*  Set name / label needed for actions / filters
	*
	*  @since	3.6
	*  @date	23/01/13
	*/

	function __construct()
	{

		// vars
		$this->name     = 'youtube';
		$this->label    = __('Youtube');
		$this->category = __('Content', 'acf'); // Basic, Content, Choice, etc
		$this->defaults = array(
			'allow_null' => 0
		);


		// do not delete!
    	parent::__construct();

    	// settings
		$this->settings = array(
			'path'    => apply_filters('acf/helpers/get_path', __FILE__),
			'dir'     => apply_filters('acf/helpers/get_dir', __FILE__),
			'version' => '1.1.2'
		);

	}

	/*
	*  create_options()
	*
	*  Create extra options for your field. This is rendered when editing a field.
	*  The value of $field['name'] can be used (like bellow) to save extra data to the $field
	*
	*  @type	action
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$field	- an array holding all the field's data
	*/

	function create_options( $field )
	{
		// defaults?
		$field = array_merge($this->defaults, $field);

		// key is needed in the field names to correctly save the data
		$key = $field['name'];


		// Create Field Options HTML
		?>

		<?php

	}

	/*
	*  create_field()
	*
	*  Create the HTML interface for your field
	*
	*  @param	$field - an array holding all the field's data
	*
	*  @type	action
	*  @since	3.6
	*  @date	23/01/13
	*/

	function create_field( $field )
	{

		$field = array_merge($this->defaults, $field);

		// create Field HTML
		$dir = apply_filters('acf/helpers/get_dir', __FILE__);
		echo "<div class='yt-wrapper'>";
		echo sprintf( '<iframe class="acf-youtube" onload="acfVideoInit(this)"  src="%1$s"></iframe>', $dir . 'app/dist/index.html');
		//echo sprintf( '<input type="hidden" value="%s">',  $field['value'] );
		echo sprintf( '<input type="hidden" class="%s" name="%s" value="%s">', $field['class'], $field['name'], $field['value']  );
		echo "</div>";
	}

	/*
	*  format_value()
	*
	*  This filter is appied to the $value after it is loaded from the db and before it is passed to the create_field action
	*
	*  @type	filter
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$value	- the value which was loaded from the database
	*  @param	$post_id - the $post_id from which the value was loaded
	*  @param	$field	- the field array holding all the field options
	*
	*  @return	$value	- the modified value
	*/

	function format_value( $value, $post_id, $field ) {
		return htmlspecialchars( json_encode( $value ) );
	}

	/*
	*  format_value_for_api()
	*
	*  This filter is appied to the $value after it is loaded from the db and before it is passed back to the api functions such as the_field
	*
	*  @type	filter
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$value	- the value which was loaded from the database
	*  @param	$post_id - the $post_id from which the value was loaded
	*  @param	$field	- the field array holding all the field options
	*
	*  @return	$value	- the modified value
	*/

	function format_value_for_api( $value, $post_id, $field ) {
		$field = array_merge($this->defaults, $field);
		if( !$value ) {
			return false;
		}

		return $value;
	}

	/*
	*  update_field()
	*
	*  This filter is appied to the $field before it is saved to the database
	*
	*  @type	filter
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$field - the field array holding all the field options
	*  @param	$post_id - the field group ID (post_type = acf)
	*
	*  @return	$field - the modified field
	*/

	function update_field( $field, $post_id )
	{
		die(var_dump($field));

		// format sub_fields
		if( $field['layouts'] )
		{
			$layouts = array();

			// loop through and save fields
			foreach($field['layouts'] as $layout_key => $layout)
			{

				if( $layout['sub_fields'] )
				{
					// remove dummy field
					unset( $layout['sub_fields']['field_clone'] );


					// loop through and save fields
					$i = -1;
					$sub_fields = array();


					foreach( $layout['sub_fields'] as $key => $f )
					{
						$i++;


						// order + key
						$f['order_no'] = $i;
						$f['key'] = $key;


						// save
						$f = apply_filters('acf/update_field/type=' . $f['type'], $f, $post_id ); // new filter


						$sub_fields[] = $f;

					}


					// update sub fields
					$layout['sub_fields'] = $sub_fields;

				}

				$layouts[] = $layout;

			}

			// clean array keys
			$field['layouts'] = $layouts;

		}


		// return updated repeater field
		return $field;
	}

	/*
	*  update_value()
	*
	*  This filter is appied to the $value before it is updated in the db
	*
	*  @type	filter
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$value - the value which will be saved in the database
	*  @param	$field - the field array holding all the field options
	*  @param	$post_id - the $post_id of which the value will be saved
	*
	*  @return	$value - the modified value
	*/

	function update_value( $value, $post_id, $field ) {

		return json_decode( urldecode( $value ) );
	}
}


// create field
new acf_field_youtube();

?>