# Horizontal Lazy Pagination component for React Native

React Native component for rendering an horizontal scroll view with lazy loading and pagination enabled.

## Docs

The main wrapper for this component is a ScrollView with the 'horizontal' and 'pagingEnabled' props turned on. Usually, you will want to render your own vertical ScrollViews as childs for each view; for that to work, enable the 'nestedScrollEnabled' in your ScrollView's (see the example code for a reference).

#### Props

| prop                      |   type   |   default    | required | description                                                                                                                                                                                                                                |
| ------------------------- | :------: | :----------: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data                      |  array   |      -       |   yes    | An array of data to be iterated.                                                                                                                                                                                                           |
| renderRow                 | function |      -       |   yes    | A function to be called for every element in data that will be rendered. Receives the current iterating item and its index as the first 2 arguments. It must return a React Native element which will be wrapped by a vertical ScrollView. |
| numberOfRenderedViews     |  number   |      3       |   no    | Number of pages that will be rendered before hand. 3 means "render the current view, the one before (if there is one) and one afterwards (if there is one)                                                                                                                                                                                                           |
| initialIndex              |  number  |      0       |    no    | The index of the element of tha data array to be rendered as first view.                                                                                                                                                                   |
| loader                    | element  | loading text |    no    | An element to be shown while lazy loading. This will be shown only if the user scrolls fast enough so that the next view is still loading.                                                                                                 |
| onReleaseDragTouch        | function |      -       |    no    | A function that is triggered whenever the user stops dragging the view, even if the page doesn't end up changing. It passes the index of the current viewing element as an argument.                                                       |
| horizontalScrollViewProps |  object  |      -       |    no    | An object to be spread as props into the main wrapper (a ScrollView with the 'horizontal' and 'pagingEnabled' props turned on).                                                                                                            |

## Example

```JavaScript
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
        renderRow={(item, index) => (
            <ScrollView key={index} style={s.page} nestedScrollEnabled showsVerticalScrollIndicator={false}>
              <Text>{item.key}</Text>
            </ScrollView>
          )
        }
        numberOfRenderedViews={3}
      />
    );
  }
}

const s = StyleSheet.create({
	page: {
		paddingTop: 30,
		paddingBottom: 30,
		paddingLeft: 20,
		paddingRight: 20,
		width: Dimensions.get('window').width,
	},
});
```

### Result

![](https://i.imgur.com/5zbZ47r.gif)
