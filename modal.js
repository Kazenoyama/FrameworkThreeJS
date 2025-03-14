import  CTABanner  from './CTABanner';


class Modal {
    CTABannerParameter;         // Contains the following keys: Banner, navbar, container
    
    constructor(existingBanner=null) {
        let Banner, navbar, container;
        if (existingBanner) {
            // Use the existing Banner instance
             Banner = existingBanner;
             navbar = Banner.getNavbar();
             container = Banner.getContainer();
        } else {
            // Create new Banner instance if none is provided
            Banner = new CTABanner();
             navbar = Banner.getNavbar();
             container = Banner.getContainer();
        }
      
        this.modals = {};
        this.CTABannerParameter = {"Banner": Banner, "navbar": navbar, "container": container};
        
    }




    /**
     * Get or create a permanent modal window that can be used for controls and parameters.
     * The modal is created with drag functionality and can be positioned anywhere on the screen.
     * Uses the existing CTABanner styling and functionality.
     * 
     * @param {Object} options - Configuration options for the permanent modal
     * @param {string} [options.title="Parameters"] - The title of the modal
     * @param {boolean} [options.draggable=true] - Whether the modal can be dragged
     * @param {boolean} [options.showCloseButton=true] - Whether to show a close button
     * @param {Object} [options.position] - Initial position of the modal
     * @param {number} [options.position.right=10] - Right position as percentage
     * @param {number} [options.position.top=10] - Top position as percentage
     * @param {string} [options.width="300px"] - Width of the modal
     * @param {boolean} [options.visible=true] - Whether the modal is initially visible
     * @param {string} [options.id="controlPanel"] - ID for the modal element
     * @param {string} [options.theme="light"] - Theme for the modal (light or dark)
     * @returns {Object} - An object containing methods to interact with the modal
     */
    getPermanentModal({title, draggable, showCloseButton, position, width, visible, id, theme} = {}) {
        let defaultParams = {
            title: "Parameters",
            draggable: true,
            showCloseButton: true,
            position: { right: 10, top: 10 },
            width: "300px",
            visible: true,
            id: "controlPanel",
            theme: "light"
        };

        if (title) defaultParams.title = title;
        if (draggable !== undefined) defaultParams.draggable = draggable;
        if (showCloseButton !== undefined) defaultParams.showCloseButton = showCloseButton;
        if (position) {
            if (position.right !== undefined) defaultParams.position.right = position.right;
            if (position.top !== undefined) defaultParams.position.top = position.top;
        }
        if (width) defaultParams.width = width;
        if (visible !== undefined) defaultParams.visible = visible;
        if (id) defaultParams.id = id;
        if (theme) defaultParams.theme = theme;

        // Get Banner reference for creating and styling elements
        const Banner = this.CTABannerParameter.Banner;
        
        // Check if a modal already exists
        let modal = document.getElementById(defaultParams.id);
        let modalContent;
        
        if (!modal) {
            // Create new modal using the existing Banner method
            Banner.create_modal(defaultParams.id);
            modal = document.getElementById(defaultParams.id);
            modalContent = Banner.getModal_content(defaultParams.id);
            
            // Set title
            const titleElement = modalContent.querySelector("h2");
            if (titleElement) {
                titleElement.textContent = defaultParams.title;
                titleElement.style.margin = "0 0 15px 0";
                titleElement.style.padding = "5px";
                titleElement.style.borderBottom = "1px solid #ccc";
            }
            
            // Hide close button if not needed
            if (!defaultParams.showCloseButton) {
                const closeButton = modalContent.querySelector(".close");
                if (closeButton) closeButton.style.display = "none";
            }
        } else {
            modalContent = Banner.getModal_content(defaultParams.id);
            
            // Update title of existing modal
            const titleElement = modalContent.querySelector("h2");
            if (titleElement) titleElement.textContent = defaultParams.title;
        }
        
        // Update modal style and position
        modal.style.position = "fixed";
        modal.style.top = `${defaultParams.position.top}%`;
        modal.style.right = `${defaultParams.position.right}%`;
        modal.style.width = defaultParams.width;
        modal.style.display = defaultParams.visible ? "block" : "none";
        modal.style.zIndex = "1000";
        modal.style.backgroundColor = "transparent";
        
        // Apply theme
        if (defaultParams.theme === "dark") {
            modalContent.style.backgroundColor = "#333";
            modalContent.style.color = "#fff";
            const titleElement = modalContent.querySelector("h2");
            if (titleElement) titleElement.style.borderBottom = "1px solid #555";
        } else {
            modalContent.style.backgroundColor = "#fff";
            modalContent.style.color = "#333";
        }
        
        // Improve modal content styling
        modalContent.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        modalContent.style.borderRadius = "8px";
        modalContent.style.padding = "15px";
        modalContent.style.maxHeight = "80vh";
        modalContent.style.overflowY = "auto";
        
        // Make draggable using Banner's dragging functionality
        if (defaultParams.draggable) {
            modalContent.style.cursor = "move";
            const titleElement = modalContent.querySelector("h2");
            
            modalContent.addEventListener("mousedown", (e) => {
                // Start drag only if clicking on the title area, not on buttons or inputs
                if (e.target === titleElement || e.target === modalContent) {
                    Banner.startDrag(e, defaultParams.id);
                }
            });
        }
        
        // Create a container for form elements inside the modal
        let formContainer = modalContent.querySelector(".form-container");
        if (!formContainer) {
            formContainer = document.createElement("div");
            formContainer.className = "form-container";
            formContainer.style.display = "flex";
            formContainer.style.flexDirection = "column";
            formContainer.style.gap = "10px";
            modalContent.appendChild(formContainer);
        }
        
        // Return methods to interact with the modal
        return {
            addButton: (text, onClick, options = {}) => {
                // Create a button similar to how Banner creates buttons
                const button = document.createElement("button");
                button.textContent = text;
                button.onclick = onClick;
                
                // Apply styling
                button.style.display = "block";
                button.style.padding = "10px";
                button.style.margin = "10px auto";
                button.style.cursor = "pointer";
                button.style.width = options.width || "80%";
                button.style.backgroundColor = options.color || "#4CAF50";
                button.style.color = options.textColor || "white";
                button.style.border = "none";
                button.style.borderRadius = "4px";
                button.style.transition = "background-color 0.3s";
                
                // Add hover effects
                button.addEventListener("mouseover", () => {
                    button.style.backgroundColor = options.hoverColor || "#45a049";
                });
                
                button.addEventListener("mouseout", () => {
                    button.style.backgroundColor = options.color || "#4CAF50";
                });
                
                formContainer.appendChild(button);
                return button;
            },
            
            addSlider: (label, min, max, value, onChange, options = {}) => {
                const container = document.createElement("div");
                container.style.margin = "5px 0";
                container.style.textAlign = "left";
                
                const labelElement = document.createElement("label");
                labelElement.textContent = label;
                labelElement.style.display = "block";
                labelElement.style.marginBottom = "5px";
                labelElement.style.fontWeight = "bold";
                
                const sliderContainer = document.createElement("div");
                sliderContainer.style.display = "flex";
                sliderContainer.style.alignItems = "center";
                
                const slider = document.createElement("input");
                slider.type = "range";
                slider.min = min;
                slider.max = max;
                slider.step = options.step || 1;
                slider.value = value;
                slider.style.flex = "1";
                
                const valueDisplay = document.createElement("span");
                valueDisplay.textContent = options.formatValue ? options.formatValue(value) : value;
                valueDisplay.style.marginLeft = "10px";
                valueDisplay.style.minWidth = "40px";
                valueDisplay.style.textAlign = "right";
                
                slider.addEventListener("input", () => {
                    const numValue = Number(slider.value);
                    valueDisplay.textContent = options.formatValue ? options.formatValue(numValue) : numValue;
                    if (onChange) onChange(numValue);
                });
                
                sliderContainer.appendChild(slider);
                sliderContainer.appendChild(valueDisplay);
                container.appendChild(labelElement);
                container.appendChild(sliderContainer);
                formContainer.appendChild(container);
                
                return { slider, valueDisplay, container };
            },
            
            addCheckbox: (label, checked, onChange) => {
                const container = document.createElement("div");
                container.style.margin = "5px 0";
                container.style.textAlign = "left";
                container.style.display = "flex";
                container.style.alignItems = "center";
                
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = checked;
                checkbox.style.marginRight = "10px";
                checkbox.style.transform = "scale(1.2)";
                
                const labelElement = document.createElement("label");
                labelElement.textContent = label;
                
                checkbox.addEventListener("change", () => {
                    if (onChange) onChange(checkbox.checked);
                });
                
                container.appendChild(checkbox);
                container.appendChild(labelElement);
                formContainer.appendChild(container);
                
                return { checkbox, container };
            },
            
            addDropdown: (label, options, selectedValue, onChange) => {
                const container = document.createElement("div");
                container.style.margin = "5px 0";
                container.style.textAlign = "left";
                
                const labelElement = document.createElement("label");
                labelElement.textContent = label;
                labelElement.style.display = "block";
                labelElement.style.marginBottom = "5px";
                labelElement.style.fontWeight = "bold";
                
                const select = document.createElement("select");
                select.style.width = "100%";
                select.style.padding = "5px";
                select.style.borderRadius = "4px";
                
                options.forEach(opt => {
                    const optionElement = document.createElement("option");
                    optionElement.value = opt.value;
                    optionElement.textContent = opt.label || opt.value;
                    if (opt.value === selectedValue) optionElement.selected = true;
                    select.appendChild(optionElement);
                });
                
                select.addEventListener("change", () => {
                    if (onChange) onChange(select.value);
                });
                
                container.appendChild(labelElement);
                container.appendChild(select);
                formContainer.appendChild(container);
                
                return { select, container };
            },

            addColorPicker: (label, initialColor, onChange) => {
                const container = document.createElement("div");
                container.style.margin = "5px 0";
                container.style.textAlign = "left";
                
                const labelElement = document.createElement("label");
                labelElement.textContent = label;
                labelElement.style.display = "block";
                labelElement.style.marginBottom = "5px";
                labelElement.style.fontWeight = "bold";
                
                const pickerContainer = document.createElement("div");
                pickerContainer.style.display = "flex";
                pickerContainer.style.alignItems = "center";
                
                const colorPicker = document.createElement("input");
                colorPicker.type = "color";
                colorPicker.value = initialColor;
                colorPicker.style.margin = "0 10px 0 0";
                
                const valueDisplay = document.createElement("span");
                valueDisplay.textContent = initialColor;
                valueDisplay.style.fontFamily = "monospace";
                
                colorPicker.addEventListener("input", () => {
                    valueDisplay.textContent = colorPicker.value;
                    if (onChange) onChange(colorPicker.value);
                });
                
                pickerContainer.appendChild(colorPicker);
                pickerContainer.appendChild(valueDisplay);
                container.appendChild(labelElement);
                container.appendChild(pickerContainer);
                formContainer.appendChild(container);
                
                return { colorPicker, valueDisplay, container };
            },

            addSeparator: () => {
                const separator = document.createElement("hr");
                separator.style.margin = "10px 0";
                separator.style.border = "none";
                separator.style.borderTop = "1px solid #ccc";
                formContainer.appendChild(separator);
                return separator;
            },
            
            addLabel: (text, options = {}) => {
                const label = document.createElement("div");
                label.textContent = text;
                label.style.margin = "5px 0";
                label.style.textAlign = options.align || "left";
                label.style.fontWeight = options.bold ? "bold" : "normal";
                label.style.fontSize = options.fontSize || "inherit";
                label.style.color = options.color || "inherit";
                formContainer.appendChild(label);
                return label;
            },
            
            clear: () => {
                // Remove all content in the form container
                while (formContainer.firstChild) {
                    formContainer.removeChild(formContainer.firstChild);
                }
            },
            
            show: () => {
                modal.style.display = "block";
            },
            
            hide: () => {
                modal.style.display = "none";
            },
            
            toggle: () => {
                modal.style.display = modal.style.display === "none" ? "block" : "none";
            },
            
            getElement: () => modal,
            getContentElement: () => modalContent,
            getFormContainer: () => formContainer,
            
            setPosition: (top, right) => {
                if (top !== undefined) modal.style.top = typeof top === 'number' ? `${top}%` : top;
                if (right !== undefined) modal.style.right = typeof right === 'number' ? `${right}%` : right;
            },
            
            setSize: (width, height) => {
                if (width) modal.style.width = width;
                if (height) modalContent.style.height = height;
            },
            
            // Add a method to create a toggle button in the navbar for this modal
            createToggleButton: (buttonText = "Controls") => {
                return this.addButtonToNavbar({
                    textButton: buttonText,
                    onclickFunction: () => modal.style.display = modal.style.display === "none" ? "block" : "none"
                });
            }
        };
}

}
export default Modal;
