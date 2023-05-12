import React from "react";

import { useLocation } from "@docusaurus/router";

import { readSearchTags } from "../pages/showcase/_components/TagSelect";

export const useSelectedTags = () => {
	const location = useLocation();
	const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
	React.useEffect(() => {
		const tags = readSearchTags(location.search);
		setSelectedTags(tags);
	}, [location]);

	return selectedTags;
};
