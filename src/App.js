import './App.css';
import React, { useState, useEffect } from 'react';
import { request } from 'graphql-request';
import Paginate from './Components/Pagination';

const App = () => {

	const [blogPosts, setBlogPosts] = useState(posts);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(3);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		const fetchBlogPosts = async () => {
			const { posts } = await request(
				`https://api-sa-east-1.hygraph.com/v2/${process.env.REACT_APP_GRAPHQL_KEY}/master`,
				`     {
					posts {
						id,
						title,
						excerpt,
						slug,
						publishedAt,
						coverImage {
						  url
						}
						author {
						  name
						  picture {
							url
						  }
						}
					 }
				}
				`
			);

			setBlogPosts(posts);
		};

		fetchBlogPosts();

	}, []);

	return (
		<div className="flex flex-col min-h-screen">

			<div className="bg-gray-900 pt-12 pb-6 flex-1">

				<div className="title text-center mb-9">
					<h2 className="text-white"> Pagination with ReactJs </h2>
				</div>

				{currentPosts ? (

					<div className="container mx-auto">
						<div className="flex flex-wrap md:-mx-3">
							{currentPosts.map((blogPost) => (

								<div className="lg:w-1/3 md:w-1/2 px-3 mb-6" key={blogPost.id}>
									<div className="flex w-full h-full flex-wrap bg-gray-800 overflow-hidden rounded">
										<div className="w-full">
											<img className="object-cover h-full w-full" src={blogPost.coverImage?.url} alt='' />
										</div>
										<div className="w-full p-5">
											<h2 className="text-white leading-normal text-lg"> {blogPost.title} </h2>
											<div className="flex flex-wrap justify-between items-center mt-6">
												<div className="inline-flex items-center">
													<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
														<img src={blogPost.author.picture?.url} alt={blogPost.author.name} />
													</div>
													<div className="flex-1 pl-2">
														<h2 className="text-white mb-1"> {blogPost.author.name} </h2>
														<p className="text-white opacity-50 text-xs">
															{new Date(`${blogPost.publishedAt}`).toLocaleDateString(
																'pt-br',
																{
																	month: 'short',
																	day: 'numeric',
																}
															)}
														</p>
													</div>
												</div>
												<span className="text-white opacity-50">
													<svg className="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459">
														<path d="M357 0H102C73.95 0 51 22.95 51 51v408l178.5-76.5L408 459V51c0-28.05-22.95-51-51-51z" />
													</svg>
												</span>
											</div>
										</div>
									</div>
								</div>

							))}
						</div>

						<Paginate
							postsPerPage={postsPerPage}
							totalPosts={blogPosts.length}
							paginate={paginate}
						/>
					</div >
				) : (
					<div className="loading"> Carregando... </div>
				)}
			</div>
		</div>

	);
}

export default App;
