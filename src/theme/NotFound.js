import Translate, { translate } from "@docusaurus/Translate";
import { PageMetadata } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";
import React from "react";
export default function NotFound() {
	return (
		<>
			<PageMetadata
				title={translate({
					id: "theme.NotFound.title",
					message: "Page Not Found",
				})}
			/>
			<Layout>
				<main className="container margin-vert--xl">
					<div className="row">
						<div className="col col--6 col--offset-3">
							<h1 className="hero__title text-center mb-8">
								<Translate
									id="theme.NotFound.title"
									description="The title of the 404 page"
								>
									404 - Page Not Found
								</Translate>
							</h1>
							<img src="/design/chirpy.png" alt='Chirpy' />
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
}
