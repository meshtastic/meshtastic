import React from "react";

import { ShowcaseTag } from "../../../utils/apiTypes";

export interface CardTagsProps {
	tags: ShowcaseTag[];
}

export const CardTags = ({ tags }: CardTagsProps) => {
	return (
		<div>
			{tags.map(({ color, label }) => {
				return (
					<span
						className="badge"
						key={label}
						style={{
							backgroundColor: color,
							marginRight: "0.3rem",
							userSelect: "none",
						}}
					>
						{label}
					</span>
				);
			})}
		</div>
	);
};
