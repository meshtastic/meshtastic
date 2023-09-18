import React from "react";

import useSWR from "swr";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Showcase } from "../../../utils/apiTypes";
import { fetcher } from "../../../utils/swr";

interface NetworkProps {
	id: string;
}

export const Network = ({ id }: NetworkProps): JSX.Element => {
	const { siteConfig } = useDocusaurusContext();

	const { data, error } = useSWR<Showcase>(
		`${siteConfig.customFields.API_URL}/showcase/${id}`,
		fetcher,
	);

	const githubData = useSWR(
		`https://api.github.com/users/${data?.author?.githubUsername}`,
		fetcher,
	).data;

	return (
		<div>
			<div className="container">
				<div className="markdown">{data.body}</div>
			</div>
		</div>
	);
};
