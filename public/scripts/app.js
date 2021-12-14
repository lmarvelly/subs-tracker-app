'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author Luke Marvelly
 * @version 1.0
 *
 * @class IndecisionApp @extends React.Component
 * @description the main class in this project
 *
 * @constructor Binding here is important otherwise these functions 
 *    won't work in other classes
 *    @example this.handlePick = this.handlePick.bind(this);
 *
 * @param props are like html key-values e.g. id='name'
 *    They CANNOT be changed by the component. Only the parent of
 *    that component can do so.
 *
 * @param state The App state. if you cant to make changes using  
 *    dynamic attribues you can use state. It constains the 
 *    @param options[] list
 * 
 * @function handleDeleteOptions() @returns an empty array to  
 *    options[] to replace the array of options using the setState 
 *    callback
 * @function handleDeleteOption() handles deleting a single option
 *    from the options array
 * @function handlePick() Randomly pick an option from the array of
 *    options which is initialized with no options
 * @function handleAddOption(option) handles when an option is being
 *    submitted. If nothing was submitted or if option submitted 
 *    already exists an error is generated
 *    @param prevState is an argument passed to setState callback
 *    function. We could call it anything
 *    @param option value is retreived from the form text box named
 *    option
 *    @param options[] option added into this array using concat()
 *    (much like a string is added onto another string)
 * @function render() We use this to render the app onto the HTML 
 *    page. When this gets called it causes child components to 
 *    rerender as well. We bind functions to the component we wish to
 *    use them with in here. They can then be accessed by the props 
 *    attribute.
 *    @example handlePick={this.handlePick}
 */
var IndecisionApp = function (_React$Component) {
   _inherits(IndecisionApp, _React$Component);

   function IndecisionApp(props) {
      _classCallCheck(this, IndecisionApp);

      var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

      _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
      _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
      _this.handlePick = _this.handlePick.bind(_this);
      _this.handleAddOption = _this.handleAddOption.bind(_this);

      _this.state = {
         options: []
      };
      return _this;
   }

   _createClass(IndecisionApp, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
         // console.log('fetching data');
         try {
            var json = localStorage.getItem('options');
            var options = JSON.parse(json);
            /**
             * Only change state if there are options. 
             */
            if (options) {
               // options is shorthand for options : options
               this.setState(function () {
                  return { options: options };
               });
            }
         } catch (error) {}
      }
   }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
         /**
          * Condition stop saving redundant data. This will be
          * handy in the future so we're not adding usless data to
          * the database
          */
         if (prevState.options.length !== this.state.options.length) {
            // console.log('saving data'); 
            var json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
         }
      }
   }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
         console.log('componentWillUnmount');
      }
   }, {
      key: 'handleDeleteOptions',
      value: function handleDeleteOptions() {
         this.setState(function () {
            return { options: [] };
         });
      }
   }, {
      key: 'handleDeleteOption',
      value: function handleDeleteOption(optionToRemove) {
         // console.log('handleDeleteOption', option);
         // returns true or false if we want to keep item in array
         this.setState(function (prevState) {
            return {
               // filter used each option like for-each()
               options: prevState.options.filter(function (option) {
                  return optionToRemove !== option;
               })
            };
         });
      }
   }, {
      key: 'handlePick',
      value: function handlePick() {
         var randomNum = Math.floor(Math.random() * this.state.options.length);
         var option = this.state.options[randomNum];
         alert(option);
      }
   }, {
      key: 'handleAddOption',
      value: function handleAddOption(option) {
         if (!option) {
            return "Enter valid value to add item";
         } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists";
         }
         /**
          * This effectively is equivalent to else
          * @returns a new array with the new object concatinated onto
          * it
          * NOTE you don't want to manipulate the old array here hence
          * creating a new one using concat()
          */
         this.setState(function (prevState) {
            return {
               options: prevState.options.concat(option)
            };
         });
      }
   }, {
      key: 'render',
      value: function render() {
         var subtitle = 'Put your life in the hand of a computer';

         return React.createElement(
            'div',
            null,
            React.createElement(Header, { subtitle: subtitle }),
            React.createElement(Action, {
               hasOptions: this.state.options.length > 0,
               handlePick: this.handlePick
            }),
            React.createElement(Options, {
               options: this.state.options,
               handleDeleteOptions: this.handleDeleteOptions,
               handleDeleteOption: this.handleDeleteOption
            }),
            React.createElement(AddOption, {
               handleAddOption: this.handleAddOption
            })
         );
      }
   }]);

   return IndecisionApp;
}(React.Component);

/**
 * @React components require one method to be defined
 */

/**
 * @constant Header
 * @description returns the header and the subtitle of the app
 * @returns returns the header and the subtitle of the app
 * 
 * @param props an array of properties passed into the variable
 * @param props.title the title
 * @param props.subtitle the subtitle
 */


var Header = function Header(props) {
   return React.createElement(
      'div',
      null,
      React.createElement(
         'h1',
         null,
         props.title
      ),

      // return props.subtitle or false
      props.subtitle && React.createElement(
         'h2',
         null,
         props.subtitle
      )
   );
};

/**
 * @property Setting the defaultProps for Header
 */
Header.defaultProps = {
   title: 'Indecision'
};

/**
 * @constant Action 
 *
 * @description returns a button that chooses an option from the 
 *    list
 * @returns a button that chooses an option from the list.
 *    The button has two functions attached to it
 * @param props an array of properties passed into the variable
 * @param props.handlePick is a callback to the function handlePick()
 *    in IndecisionApp class
 * @param props.hasOptions is a callback to the function hasOptions()
 *    in IndecisionApp class
 */
var Action = function Action(props) {
   return React.createElement(
      'div',
      null,
      React.createElement(
         'button',
         {
            onClick: props.handlePick,
            disabled: !props.hasOptions
         },
         'What should I do'
      )
   );
};

/**
 * @constant Options
 * @description handles adding new options
 * @returns a button that removes all options
 *
 * @param props an array of properties passed into the variable
 * @param options is an array of options
 * @param props.handleDeleteOptions is a callback to the function 
 * handleDeleteOptions() in IndecisionApp class
 * @param props.handleDeleteOption is a callback to the function 
 * handleDeleteOption() in IndecisionApp class
 */
var Options = function Options(props) {
   return React.createElement(
      'div',
      null,
      React.createElement(
         'button',
         { onClick: props.handleDeleteOptions },
         'Remove All'
      ),

      // add a little message when there is not data
      props.options.length === 0 && React.createElement(
         'p',
         null,
         'Please add an option to get started'
      ),
      props.options.map(function (option) {
         return React.createElement(Option, {
            key: option,
            optionText: option,
            handleDeleteOption: props.handleDeleteOption
         });
      })
   );
};

/**
 * @constant option
 * @description returns an option
 * @returns an option
 *
 * @param props an array of properties passed into the variable
 * @param props.handleDeleteOption is a callback to the function
 * handleDeleteOption() from the Options constant using the 
 * props.optionsText
 * @param props.optionText is a callback to the function optionText()
 * in the Options constant to retreive the option text
 */
var Option = function Option(props) {
   return React.createElement(
      'div',
      null,
      props.optionText,
      React.createElement(
         'button',
         {
            onClick: function onClick(e) {
               props.handleDeleteOption(props.optionText);
            }
         },
         'remove'
      )
   );
};

var AddOption = function (_React$Component2) {
   _inherits(AddOption, _React$Component2);

   // need simple constructor for this keyword to work
   function AddOption(props) {
      _classCallCheck(this, AddOption);

      var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

      _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
      _this2.state = {
         // By default there is no error
         error: undefined
      };
      return _this2;
   }

   /**
    * @param e @todo
    *
    * @const option this is a new option to add to the options array
    * @const error a generated error message. It's set to undefine
    * by detault if there is no error
    */


   _createClass(AddOption, [{
      key: 'handleAddOption',
      value: function handleAddOption(e) {
         // Prevent full refresh
         e.preventDefault();

         // Use trim() to get rid of spaces
         var option = e.target.elements.option.value.trim();
         var error = this.props.handleAddOption(option);

         // Input gets wiped from input box when option is entered
         if (!error) {
            // finds the input element
            e.target.elements.option.value = '';
         }

         /**  
          * @function setState() Change the state of error if there 
          * is an error
          * @param error this is shorthand for the 'error: error' state
          * value (see react-state.js for more details)
          */
         this.setState(function () {
            return { error: error };
         });
      }
   }, {
      key: 'render',
      value: function render() {
         // Form static text
         return React.createElement(
            'div',
            null,

            /**
             * This is where the new option errors are displayed
             * The error will render in a <p> if there is one
             * otherwise nothing will be displayed
             */
            this.state.error && React.createElement(
               'p',
               null,
               this.state.error
            ),
            React.createElement(
               'form',
               { onSubmit: this.handleAddOption },
               React.createElement('input', { type: 'text', name: 'option' }),
               React.createElement(
                  'button',
                  { type: 'submit' },
                  'Add Option'
               )
            )
         );
      }
   }]);

   return AddOption;
}(React.Component);

// Render jsx app but using the IndecisionApp component as an 
// argument


ReactDOM.render(React.createElement(IndecisionApp, { options: ['Option 1', 'Option 2'] }), document.getElementById('app'));
