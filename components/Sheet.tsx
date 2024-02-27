import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { convertArray } from "./Table";
import { useDispatch } from "react-redux";
const Sheet = (props: any) => {

	const dispatch = useDispatch();

	const winColor = convertArray(props.data);

	const winColorLen = winColor.length;

	let greenArray = [];
	let greenOneWinCnt1 = 0;
	let greenOneWinCnt2 = 0;
	let greenOneOverWinCnt = 0;
	let greenOverCnt = 0;
	let greenContinueArray = [];

	let blueArray = [];
	let blueOneWinCnt1 = 0;
	let blueOneWinCnt2 = 0;
	let blueOneOverWinCnt = 0;
	let blueOverCnt = 0;
	let blueContinueArray = [];
	
	let TwoOverCnt = 1;
	
	for (let i = 1; i < winColorLen; i++) {
		if(TwoOverCnt >5){
			break ;
		}
		if (winColor[i] === winColor[i - 1]) {
			TwoOverCnt++;
			if (winColor[i] === "green") {
				greenOneOverWinCnt++;
				TwoOverCnt > 2 ? greenArray.push([++greenOneWinCnt1, "nocircle"]): greenOverCnt++;				
				if(i == winColorLen - 1){
					greenContinueArray.push(greenOverCnt);
				}
			} else {
				blueOneOverWinCnt++;
				TwoOverCnt > 2 ? blueArray.push([++blueOneWinCnt1, "nocircle"]) : blueOverCnt++;
				if(i == winColorLen - 1){
					blueContinueArray.push(blueOverCnt);
				}
			}
		} else {
			TwoOverCnt = 1;			
			if (winColor[i] === "blue") {
				if (greenOneOverWinCnt >= 1) {
					// greenArray.push([++greenOneWinCnt1, "nocircle"]);
					greenContinueArray.push(greenOverCnt);
					greenOneOverWinCnt = 0;
					// console.log(greenOverCnt);
				}
				else {
					greenArray.push([++greenOneWinCnt2, "circle"]);
					
				}
			} else {
				if (blueOneOverWinCnt >= 1) {
					// blueArray.push([++blueOneWinCnt1, "nocircle"]);
					blueContinueArray.push(blueOverCnt);
					blueOneOverWinCnt = 0;
				}
				else {
					blueArray.push([++blueOneWinCnt2, "circle"]);
				}
			}
		}
	}
	
	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;
	const color_size = screenHeight > screenWidth ? screenWidth : screenHeight;

	const styles = StyleSheet.create({
		colortable: {
			borderWidth: 1,
			borderBottomWidth: 0,
			borderColor: "black",
		},
		rows: {
			width: "100%",
			borderBottomWidth: 1,
			flexDirection: "row",
			alignItems: "center"
		},
		left: {
			width: (screenWidth - 30) / 12,
			// padding: 5,
			alignItems: "center",
			justifyContent: "center"
		},
		circle: {
			width: color_size  / 22,
			height: color_size / 22,
			borderRadius: 50,
			borderWidth: 1,
			textAlign: "center",
			alignItems: "center",
			justifyContent: "center",
			paddingTop: color_size/ 22 / 5
		},
		bgGreen: {
			backgroundColor: "green"
		},
		bgBlue: {
			backgroundColor: "blue",
			borderBottomWidth: 1
		},
		right: {
			width: (screenWidth - 30) / 12,
			borderBottomWidth: 0
		},
		top: {
			flexDirection: "row"
		},
		bottom: {
			flexDirection: "row",
		},
		cell: {
			borderWidth: 1,
			borderRightWidth: 0,
			borderColor: "black",
			width: (screenWidth-30) / 12,
			height: screenHeight / 20,
			alignItems: "center",
			justifyContent: "center"
		},
		bTop_0: {
			borderTopWidth: 0
		},
		bTop_1: {
			borderTopWidth: 1
		},
		bBottom_0: {
			borderBottomWidth: 0
		},
		bLeft_0: {
			borderLeftWidth: 0
		},
		bRight_0: {
			borderRightWidth: 0
		},
		textCenter: {
			textAlign: "center"
		}
	});

	return (
		<View style={styles.colortable}>
			<View style={styles.rows}>
				<View style={[styles.left]}>
					<View style={[styles.circle, styles.bgGreen]} />
				</View>
				<View style={styles.right}>
					<View style={styles.top}>
						{greenArray.map((item, itemIdex) => (
							(item[1] == "circle") ? (
								<View style={[styles.cell, styles.bTop_0]} key={itemIdex}>
									<Text style={[styles.circle, styles.textCenter]}>{item[0]}</Text>
								</View>
							) : (
								<View style={[styles.cell, styles.bTop_0]} key={itemIdex}>
									<Text>{item[0]}</Text>
								</View>
							)
						))}
						{[...Array(Math.max(0, 11 - greenArray.length))].map((_, index) => (
							<View style={[styles.cell, styles.bTop_0]} key={index}>
								<Text></Text>
							</View>
						))}
					</View>
					<View style={[styles.bottom]}>
						{greenContinueArray.map((item, itemIdex) => (
							<View style={[styles.cell, styles.bTop_0, styles.bBottom_0]} key={itemIdex}>
								<Text style={[styles.circle, styles.textCenter]}>{item}</Text>
							</View>
						))}
						{[...Array(Math.max(0, 11 - greenContinueArray.length))].map((_, index) => (
							<View style={[styles.cell, styles.bTop_0]} key={index}>
								<Text></Text>
							</View>
						))}
					</View>
				</View>
			</View>
			<View style={styles.rows}>
				<View style={[styles.left, styles.bTop_0]}>
					<View style={[styles.circle, styles.bgBlue]} />
				</View>
				<View style={styles.right}>
					<View style={styles.top}>
						{blueArray.map((item, itemIdex) => (
							(item[1] == "circle") ? (
								<View style={[styles.cell, styles.bTop_0]} key={itemIdex}>
									<Text style={[styles.circle, styles.textCenter]}>{item[0]}</Text>
								</View>
							) : (
								<View style={[styles.cell, styles.bTop_0]} key={itemIdex}>
									<Text>{item[0]}</Text>
								</View>
							)
						))}
						{[...Array(Math.max(0, 11 - blueArray.length))].map((_, index) => (
							<View style={[styles.cell, styles.bTop_0]} key={index}>
								<Text></Text>
							</View>
						))}
					</View>
					<View style={styles.bottom}>
						{blueContinueArray.map((item, itemIdex) => (
							<View style={[styles.cell, styles.bTop_0, styles.bBottom_0]} key={itemIdex}>
								<Text style={[styles.circle, styles.textCenter]}>{item}</Text>
							</View>
						))}
						{[...Array(Math.max(0, 11 - blueContinueArray.length))].map((_, index) => (
							<View style={[styles.cell, styles.bTop_0]} key={index}>
								<Text></Text>
							</View>
						))}
					</View>
				</View>
			</View>
			<View style={[styles.rows, styles.bTop_0, styles.bBottom_0]}>
				<View style={[styles.cell, styles.bTop_0, styles.bLeft_0]}>
					<Text>A</Text>
				</View>
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
			</View>
			<View style={[styles.rows, styles.bTop_0, styles.bBottom_0]}>
				<View style={[styles.cell, styles.bTop_0, styles.bLeft_0]}>
					<Text>G</Text>
				</View>
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
				<View style={[styles.cell, styles.bTop_0]} />
			</View>
		</View>
	)
}

export default Sheet;