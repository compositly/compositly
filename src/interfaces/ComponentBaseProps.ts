export interface ComponentBaseProps {
  /**
   * The unique identifier for the component.
   * This is used to identify the component in the DOM and for styling purposes.
   * @type {string}
   * @memberof ComponentBaseProps
   * @description The unique identifier for the component.
   * This is used to identify the component in the DOM and for styling purposes.
   * @example
   * <ComponentBase id="my-component" />
   * <ComponentBase id="my-component" className="my-class" />
   */
  id: string

  /**
   * Children components to be rendered inside this component.
   * This is useful for creating nested components or layouts.
   * @type {React.ReactNode}
   * @memberof ComponentBaseProps
   * @description Children components to be rendered inside this component.
   * This is useful for creating nested components or layouts.
   * @example
   * <ComponentBase id="my-component">
   *   <ChildComponent />
   * </ComponentBase>
   */
  children?: React.ReactNode

  /**
   * Additional class names to be applied to the component.
   * This allows for custom styling and layout adjustments.
   * @type {string}
   * @memberof ComponentBaseProps
   * @description Additional class names to be applied to the component.
   * This allows for custom styling and layout adjustments.
   * @example
   * <ComponentBase id="my-component" className="my-class" />
   */
  className?: string
}
