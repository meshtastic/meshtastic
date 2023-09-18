import "url-search-params-polyfill";

import React from "react";

import { useHistory, useLocation } from "@docusaurus/router";
import { ShowcaseTag } from "../../../utils/apiTypes";

import { toggleListItem } from "../../../utils/showcase";

interface Props extends React.ComponentProps<"input"> {
	icon: React.ReactElement<React.ComponentProps<"svg">>;
	label: React.ReactNode;
	tag: ShowcaseTag;
}

export function readSearchTags(search: string): string[] {
	return new URLSearchParams(search).getAll("tags");
}

function replaceSearchTags(search: string, newTags: string[]) {
	const searchParams = new URLSearchParams(search);
	searchParams.delete("tags");
	newTags.forEach((tag) => searchParams.append("tags", tag));
	return searchParams.toString();
}

export const TagSelect = React.forwardRef<HTMLLabelElement, Props>(
	({ icon, label, tag }) => {
		const location = useLocation();
		const history = useHistory();
		const [selected, setSelected] = React.useState(false);
		React.useEffect(() => {
			const tags = readSearchTags(location.search);
			setSelected(tags.includes(tag.label));
		}, [tag, location]);
		const toggleTag = React.useCallback(() => {
			const tags = readSearchTags(location.search);
			const newTags = toggleListItem(tags, tag.label);
			const newSearch = replaceSearchTags(location.search, newTags);
			history.push({ ...location, search: newSearch });
		}, [tag, location, history]);
		return (
			<button
				style={{
					display: "flex",
					alignItems: "center",
				}}
				className={`button button--sm button--outline button--secondary ${
					selected ? "button--active" : ""
				}`}
				onClick={() => {
					toggleTag();
				}}
			>
				{label}
				{icon}
			</button>
		);
	},
);

export const PlaceholderTagSelect = (): JSX.Element => (
	<div
		style={{
			boxSizing: "border-box",
			position: "relative",
			display: "inline-flex",
			alignItems: "center",
			height: "2rem",
			marginTop: "0.5rem",
			marginRight: "0.5rem",
			fontSize: "0.875rem",
			lineHeight: "1.25rem",
			verticalAlign: "middle",
			userSelect: "none",
		}}
	>
		<div
			style={{
				width: "7rem",
				height: "1.8rem",
				borderRadius: "0.4rem",
				backgroundColor: "gray",
				animation: "pulse 2s infinite",
				transform: "scale(1)",
			}}
		/>
		<div
			style={{
				width: "7rem",
				height: "1.8rem",
				borderRadius: "0.4rem",
				backgroundColor: "gray",
				animation: "pulse 2s infinite",
				transform: "scale(1)",
				marginLeft: 8,
			}}
		/>
		<div
			style={{
				width: "7rem",
				height: "1.8rem",
				borderRadius: "0.4rem",
				backgroundColor: "gray",
				animation: "pulse 2s infinite",
				transform: "scale(1)",
				marginLeft: 8,
			}}
		/>
	</div>
);
