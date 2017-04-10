[![Build Status](https://travis-ci.org/advanced-rest-client/raml-documentation-panel.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/raml-documentation-panel)  

# raml-documentation-panel

The documentation viewer.

It displays a documentation panel depending on if the selected object is a
method, resource, type or the documentation node.

The element will compute current view from the `path` property. However, if
the app is using [raml-path-to-object](https://elements.advancedrestclient.com/elements/raml-path-to-object)
element the you can set the `handlePathEvents` property which will make the
element to register event listeners fired from the `raml-path-to-object`
element. It will skip internall path computation to not double the work.

The element is consisted with the following documentation viewers:
- raml-docs-method-viewer
- raml-docs-resource-viewer
- raml-docs-documentation-viewer
- raml-summary-view
- raml-docs-types-viewer

Elements that are not displayed at a time are demoved from the DOM and are
inavtive. Only active elements observe changes to the `selected-object` property
and perform internall computation (it's optimisation).

### Example
```html
<raml-path-to-object path="types.0"></raml-path-to-object>
<raml-documentation-panel handle-path-events"></raml-documentation-panel>
<script>
var pto = document.querySelector('raml-path-to-object');
var docs = document.querySelector('raml-documentation-panel');
pto.addEventListener('selected-object-changed', function(e) {
  docs.selectedObject = e.detail.value;
});
pto.addEventListener('selected-parent-changed', function(e) {
  docs.selectedParent = e.detail.value;
});
</script>
```

### Handling scrolling

Set the `scrollTarget` to an element that has a scroll region to suppoer
scrolling in the elements. The resource documentation panel handles internall
links that are expected to scroll the view to correspoinding sections.
This default to the window object.

### Styling
`<raml-documentation-panel>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--raml-documentation-panel` | Mixin applied to the element | `{}`
`--raml-docs-main-content` | Mixin applied to the main docs content (where the docs content is displayed). | `{}`
`--raml-docs-main-content-width` | Max width of the documentation panel. Additional space is required for innner panels navigation | `900px`
`--raml-docs-documentation-width` | Max width of the documentation panel. It should be used to avoid usability issues for reading long texts. | `700px`

# raml-documentation-empty-state

The `raml-documentation-empty-state` is an element that shows an empty state
screen when the documentation panel has no selection.

Note: The element is set to use 100% of height. To render it on full page
height all parent elements has to be 100% height.

### Styling
`<raml-documentation-empty-state>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--raml-documentation-empty-state` | Mixin applied to the element | `{}`
`--raml-documentation-empty-state-container` | Mixin applied to the main container where the flex layout is applied | `{}`
`--raml-documentation-empty-state-message` | Mixin applied to the message element. | `{}`
`--raml-documentation-empty-state-background-color` | Background color of the element | `#FAFAFA`
`--raml-documentation-empty-state-icon-color` | Color of the icon (paths that are possible to style) | `#75c9e1`
`--raml-documentation-empty-state-icon-size` | Size of the icon | `256px`
`--raml-documentation-empty-state-message-color` | Color of the message | `#757575`
`--arc-font-body1` | Mixin applied to the message container | `{}`

