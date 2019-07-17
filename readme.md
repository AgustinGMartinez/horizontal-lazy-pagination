# Horizontal Lazy Pagination component for React Native

React Native component for rendering an horizontal scroll view with lazy loading and pagination enabled.

## Docs

This Horizontal ScrollView renders only the current view plus the 2 nearests views based on the data you provide.

Horizontal Lazy Pagination is composed of 2 ScrollViews: an outer horizontal ScrollView and a vertical ScrollView for each element you pass in the data prop.
You can pass a property for each kind of ScrollView which contains props to be spread into each one, as described as follows.

#### Props

| prop                      |   type   |   default    | required | description                                                                                                                                                                                                                                |
| ------------------------- | :------: | :----------: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data                      |  array   |      -       |   yes    | An array of data to be iterated.                                                                                                                                                                                                           |
| renderRow                 | function |      -       |   yes    | A function to be called for every element in data that will be rendered. Receives the current iterating item and its index as the first 2 arguments. It must return a React Native element which will be wrapped by a vertical ScrollView. |
| initialIndex              |  number  |      0       |    no    | The index of the element of tha data array to be rendered as first view.                                                                                                                                                                   |
| loader                    | element  | loading text |    no    | An element to be shown while lazy loading. This will be shown only if the user scrolls fast enough so that the next view is still loading.                                                                                                 |
| onReleaseDragTouch        | function |      -       |    no    | A function that is triggered whenever the user stops dragging the view, even if the page doesn't end up changing. It passes the index of the current viewing element as an argument.                                                       |
| horizontalScrollViewProps |  object  |      -       |    no    | An object to be spread as props into the main wrapper (a ScrollView with the 'horizontal' and 'pagingEnabled' props turned on).                                                                                                            |
| verticalScrollViewProps   |  object  |      -       |    no    | An object to be spread as props into the individual wrappers for each view (regular ScrollViews).                                                                                                                                          |

#### Example

```
class Example extends React.Component {
	changeTopBarName = name => {
		Navigation.mergeOptions(this.props.componentId, {
			topBar: {
				title: {
					text: name,
				},
			},
		});
	};

	render() {
		return (
			<HorizontalLazyPagination
				data={[
					{ key: 'a'.repeat(6500) },
					{ key: 'b'.repeat(6500) },
					{ key: 'c'.repeat(6500) },
					{ key: 'd'.repeat(6500) },
					{ key: 'e'.repeat(6500) },
				]}
				onReleaseDragTouch={index => this.changeTopBarName(index + '')}
				initialIndex={2}
				renderRow={item => <Text>{item.key}</Text>}
			/>
		);
	}
}
```

#### Result

![](https://i.imgur.com/5zbZ47r.gif)
