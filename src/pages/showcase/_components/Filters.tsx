import React from "react";

import { FiHeart } from "react-icons/fi";
import useSWR from "swr";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { fetcher } from "../../../utils/swr";

import { ShowcaseTag } from "../../../utils/apiTypes";
// import { TagList, Tags } from '../../../utils/showcase';
import { PlaceholderTagSelect, TagSelect } from "./TagSelect";

export const Filters = (): JSX.Element => {
	const { siteConfig } = useDocusaurusContext();

	const { data, error } = useSWR<ShowcaseTag[]>(
		`${siteConfig.customFields.API_URL}/showcase/tags`,
		fetcher,
	);

	return (
		<section className="margin-top--l margin-bottom--lg container">
			{data && !error ? (
				<ul
					style={{
						padding: "0",
						display: "flex",
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					{data.map((tag, i) => {
						const { label, color } = tag;
						const id = `showcase_checkbox_id_${tag};`;

						return (
							<div
								key={i}
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
								<TagSelect
									tag={tag}
									id={id}
									label={label}
									icon={
										tag.label === "Favorite" ? (
											<span
												style={{
													display: "flex",
													marginLeft: "0.5rem",
													color: "rgb(190 24 93)",
												}}
											>
												<FiHeart />
											</span>
										) : (
											<span
												style={{
													backgroundColor: color,
													width: 10,
													height: 10,
													borderRadius: "50%",
													marginLeft: 8,
												}}
											/>
										)
									}
								/>
							</div>
						);
					})}
				</ul>
			) : (
				<PlaceholderTagSelect />
			)}
		</section>
	);
};
