import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import propTypes from 'prop-types';

class HorizontalLazyPagination extends React.Component {
	static propTypes = {
		data: propTypes.array.isRequired,
		renderRow: propTypes.func.isRequired,
		initialIndex: propTypes.number,
		onReleaseDragTouch: propTypes.func,
		loader: propTypes.element,
		horizontalScrollViewProps: propTypes.object,
		verticalScrollViewProps: propTypes.object,
	};

	static defaultProps = {
		initialIndex: 0,
		onReleaseDragTouch: () => {},
		loader: <Text>Loading...</Text>,
		horizontalScrollViewProps: {},
		verticalScrollViewProps: {},
	};

	state = {
		central: this.props.initialIndex,
	};

	goToInitialIndex = () => {
		this.wrapper.scrollTo({
			x: Dimensions.get('window').width * 2,
			animated: false,
		});
	};

	handleScroll = event => {
		const newIndex = Math.round(
			event.nativeEvent.contentOffset.x / Dimensions.get('window').width
		);
		this.setState({ central: newIndex });
		this.props.onReleaseDragTouch(newIndex);
	};

	renderDummyContent = () => (
		<View key={'' + Math.random().toFixed(4)} style={s.dummyPage}>
			{this.props.loader}
		</View>
	);

	render() {
		let { central } = this.state;
		let {
			data,
			verticalScrollViewProps,
			horizontalScrollViewProps,
			renderRow,
		} = this.props;

		data = data.filter((_, i) => {
			return [central - 1, central, central + 1].includes(i);
		});

		// for hacking the index
		const dummyDataBeforeTheContent = [];
		const dummyDataAfterTheContent = [];

		if (central > 1) {
			const remainingDummySpaces = central - 1;
			Array(remainingDummySpaces)
				.fill(1)
				.forEach(() => {
					dummyDataBeforeTheContent.push(this.renderDummyContent());
				});
		}

		if (central < data.length - 1) {
			dummyDataAfterTheContent.push(this.renderDummyContent());
		}

		return (
			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				ref={view => (this.wrapper = view)}
				onMomentumScrollEnd={this.handleScroll}
				onLayout={this.goToInitialIndex}
				{...verticalScrollViewProps}
			>
				{dummyDataBeforeTheContent}
				{data.map((item, index) => {
					return (
						<ScrollView
							key={item.key}
							style={s.page}
							nestedScrollEnabled
							showsVerticalScrollIndicator={false}
							{...horizontalScrollViewProps}
						>
							{renderRow(item, index)}
						</ScrollView>
					);
				})}
				{dummyDataAfterTheContent}
			</ScrollView>
		);
	}
}

const s = StyleSheet.create({
	page: {
		width: Dimensions.get('window').width,
		paddingHorizontal: 30,
		paddingVertical: 30,
	},
	dummyPage: {
		width: Dimensions.get('window').width,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default HorizontalLazyPagination;
