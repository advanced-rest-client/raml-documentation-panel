[![Build Status](https://travis-ci.org/advanced-rest-client/raml-documentation-panel.svg?branch=master)](https://travis-ci.org/advanced-rest-client/raml-documentation-panel)  

# raml-documentation-panel

The documentation details panel.
Is shows a documentation panel depending on if the selected object is a
method, resource or the documentation node.

The computation of the selected object should be performed outside the element.
Use the `raml-path-selector` with `raml-path-to-object` to get the data
structure that this element can work with.

### Example
```
<raml-path-to-object selected-object="{{obj}}" ...></raml-path-to-object>
<raml-documentation-panel
  selected-object="[[obj]]"
  selected-parent="[[selectedParent]]"
  path="[[path]]"></raml-documentation-panel>
```
or
```
document.querySelector('raml-documentation-panel').selectedObject = obj;
```

The `path` property is required because the `raml-docs-resource-viewer`
required current path to compute relative paths to sub-resources.


### Styling
`<raml-documentation-panel>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--raml-documentation-panel` | Mixin applied to the element | `{}`
`--raml-docs-main-content` | Mixin applied to the main docs content (where the docs content is displayed). | `{}`
`--raml-docs-main-content-width` | Max width of the documentation panel. Additional space is required for innner panels navigation | `900px`
`--raml-docs-documentation-width` | Max width of the documentation panel. It should be used to avoid usability issues for reading long texts. | `700px`

