import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as $ from 'jquery';

export class EmailVerifier implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _input: HTMLInputElement;
    private _output: HTMLLabelElement;
    private _submitButton: HTMLElement;
    private _breakElement: HTMLElement;
    private _space: HTMLElement;

    private _submitClicked: EventListenerOrEventListenerObject;
    private _context: ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged: () => void;
    private _container: HTMLDivElement;

    private _value: string;
    private _status: boolean;
    
    

	/**
	 * Empty constructor.
	 */
	constructor()
	{

    }

    public submitClick(evt: Event): void {
        this._value = this._input.value;


        $.getJSON(
            'https://email.perfectvalidation.com/api/validate/' + encodeURIComponent(this._value) + '/'
        ).done(function (info) {
            if (info && info.Summary) {
                // you may want to adjust thresholds according to your needs, default is 0.1
                if (info.Summary.validity > 0.1 && info.Summary.deliverability > 0.1) {
                    // alert('valid');                     
                    //(<HTMLInputElement>document.getElementById("out")).innerHTML = 'valid email';
                    (<HTMLInputElement>document.getElementById("in")).classList.remove("InValid");
                    (<HTMLInputElement>document.getElementById("in")).classList.add("Valid");
                } else {
                    // the email is NOT valida
                    //alert('invalid');
                    //(<HTMLInputElement>document.getElementById("out")).innerHTML = 'invalid email';
                    (<HTMLInputElement>document.getElementById("in")).classList.remove("Valid");
                    (<HTMLInputElement>document.getElementById("in")).classList.add("InValid");
                    switch (info.Summary.errors[0].code) {
                        case 1: /* email address must contain @ */ break;
                        case 2: /* mailbox is not specified before @ */ break;
                        case 3: /* domain is not specified after @ */ break;
                        case 4: /* invalid domain name */ break;
                        case 5: /* invalid mailbox, see info.Summary.errors[0].message for more details */ break;
                    }                    
                }
            } else {
                // something went wrong during the API request, consider valid
            }
        }).fail(function () {
            // something went wrong during the API request, consider valid
        });
    }

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
        this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;
        this._container = container;
        this._submitClicked = this.submitClick.bind(this);
       

        this._input = document.createElement("input");
        this._input.setAttribute("type", "text");
        this._input.setAttribute("id", "in");
        //this._input.addEventListener('keyup', this.onKeyUp.bind(this));
        this._breakElement = document.createElement("br");
        this._space = document.createElement("span")
        this._output = document.createElement("label");
        this._output.setAttribute("type", "text");
        this._output.setAttribute("id", "out");
        this._breakElement = document.createElement("br");
        this._submitButton = document.createElement("input");
        this._submitButton.setAttribute("type", "button");
        this._submitButton.setAttribute("value", "Submit");
        this._submitButton.addEventListener("click", this._submitClicked);

        this._container.appendChild(this._input);
        this._container.appendChild(this._space)
        this._container.appendChild(this._space)        
        this._container.appendChild(this._output);
        this._container.appendChild(this._submitButton); 
    }

    private onKeyUp(event: Event): void {

        this._value = this._input.value;


        $.getJSON(
            'https://email.perfectvalidation.com/api/validate/' + encodeURIComponent(this._value) + '/'
        ).done(function (info) {
            if (info && info.Summary) {
                // you may want to adjust thresholds according to your needs, default is 0.1
                if (info.Summary.validity > 0.1 && info.Summary.deliverability > 0.1) {
                    // alert('valid');                     
                    //(<HTMLInputElement>document.getElementById("out")).innerHTML = 'valid email';
                    (<HTMLInputElement>document.getElementById("in")).classList.remove("InValid");
                    (<HTMLInputElement>document.getElementById("in")).classList.add("Valid");
                } else {
                    // the email is NOT valida
                    //alert('invalid');
                    //(<HTMLInputElement>document.getElementById("out")).innerHTML = 'invalid email';
                    (<HTMLInputElement>document.getElementById("in")).classList.remove("Valid");
                    (<HTMLInputElement>document.getElementById("in")).classList.add("InValid");
                    switch (info.Summary.errors[0].code) {
                        case 1: /* email address must contain @ */ break;
                        case 2: /* mailbox is not specified before @ */ break;
                        case 3: /* domain is not specified after @ */ break;
                        case 4: /* invalid domain name */ break;
                        case 5: /* invalid mailbox, see info.Summary.errors[0].message for more details */ break;
                    }
                }
            } else {
                // something went wrong during the API request, consider valid
            }
        }).fail(function () {
            // something went wrong during the API request, consider valid
        });
    }


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}