import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const lg = window.matchMedia("min-width: 800px");

const Navbar = ({ className }) => {
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		const nav = document.getElementById("navbar");
		if (lg.matches) {
			if (nav.classList.contains("collapse")) {
				nav.classList.remove("collapse");
			}
		}
	}, []);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
		const nav = document.getElementById("navbar");
		if (nav.classList.contains("collapse")) {
			nav.classList.remove("collapse");
		} else {
			nav.classList.add("collapse");
		}
	};
	return (
		<div className={className}>
			<nav className="nav__shadow">
				<div className="navbar__brand">
					<Link to="/">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80">
							<path d="M40.9 33.3c-1.2-3.1-4.2-5-7.9-5.1-1.8-.1-3.6.4-5.1 1.2-1.7.9-3 2.2-3.7 3.9-1.2 2.6-2.8 5.1-5.4 8.4-.8 1-1.2 2.3-1.2 3.7 0 1.2.4 2.5 1.1 3.5 1.3 2 3.4 2.8 5.4 2.3 1.7-.5 4.5-1.6 5.8-2.3 1.7-.9 3.5-.9 5.2 0 1.4.7 4.1 1.8 5.8 2.3.4.1.8.2 1.2.2 1.6 0 3.1-.9 4.2-2.4.7-1 1.1-2.3 1.1-3.5 0-1.4-.4-2.6-1.2-3.7-2.1-2.9-4.2-5.6-5.3-8.5zM21.9 27.2c.7.5 1.4.9 2.1 1 .3.1.6.1 1 .1.5 0 .9-.1 1.4-.2.7-.3 1.4-.8 1.9-1.4.4-.6.8-1.3 1-2.2.4-1.6.2-3.5-.5-5.3-.7-1.8-1.8-3.3-3.1-4.3-.7-.5-1.4-.9-2.1-1-.8-.2-1.6-.1-2.3.1-.7.3-1.4.8-1.9 1.4-.4.6-.8 1.3-1 2.2-.4 1.6-.2 3.5.5 5.3.6 1.8 1.7 3.3 3 4.3zM34.7 25.6c.5.7 1.1 1.1 1.9 1.4.4.2.9.2 1.4.2.3 0 .6 0 1-.1.7-.2 1.4-.5 2.1-1 1.3-1 2.4-2.5 3.1-4.3.7-1.8.8-3.7.5-5.3-.2-.8-.5-1.6-1-2.2-.5-.7-1.1-1.1-1.9-1.4-.7-.3-1.5-.3-2.3-.1-.7.2-1.4.5-2.1 1-1.3 1-2.4 2.5-3.1 4.3-.7 1.8-.8 3.7-.5 5.3.1.9.5 1.6.9 2.2zM19.9 35.1c.2-.6.2-1.3.2-2-.2-1.4-.8-2.9-1.7-4.3-1-1.4-2.2-2.4-3.5-3-.7-.3-1.3-.5-2-.5s-1.4.2-1.9.6c-.5.4-.9 1-1.2 1.7-.2.6-.2 1.3-.2 2 .2 1.4.8 2.9 1.7 4.3 1 1.4 2.2 2.4 3.5 3 .7.3 1.3.5 2 .5h.1c.7 0 1.3-.2 1.8-.6.6-.4 1-1 1.2-1.7zM54.2 25.9c-.2-.7-.6-1.3-1.2-1.7-.5-.4-1.2-.6-1.9-.6-.6 0-1.3.2-2 .5-1.3.6-2.5 1.7-3.5 3-1 1.4-1.6 2.9-1.7 4.3-.1.7 0 1.4.2 2 .2.7.6 1.3 1.2 1.7.5.4 1.2.6 1.8.6h.1c.6 0 1.3-.2 2-.5 1.3-.6 2.5-1.7 3.5-3 1-1.4 1.6-2.9 1.7-4.3.1-.7 0-1.4-.2-2z" />
						</svg>
					</Link>
				</div>
				<button className="nav__toggler" onClick={toggleMenu}>
					{isOpen ? (
						<MenuUnfoldOutlined style={{ color: "#000" }} />
					) : (
						<MenuFoldOutlined style={{ color: "#000" }} />
					)}
				</button>
				<div className="navbar" id="navbar">
					<ul className="navbar__nav">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/explore">Explore</Link>
						</li>

						<li>
							<Link to="/" disabled>
								Doggies
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default styled(Navbar)`
	nav {
		background: #fff;
		display: flex;
		align-items: center;
		padding: 0.5rem;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0.5rem 1rem;
	}
	.nav__shadow {
		-webkit-box-shadow: 9px 4px 16px -6px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: 9px 4px 16px -6px rgba(0, 0, 0, 0.75);
		box-shadow: 9px 4px 16px -6px rgba(0, 0, 0, 0.75);
	}
	.navbar__brand {
		margin-right: 3rem;
		svg {
			width: 50px;
		}
	}
	.navbar {
		display: flex;
		flex-basis: auto;
		flex-grow: 1;
		.navbar__nav {
			display: flex;
			list-style: none;
			margin: 0;
			margin-left: auto;
			padding-inline-start: 0px;
			li {
				a {
					font-size: 16px;
					color: #373737;
					padding: 0 1rem;
					font-weight: bold;
					text-decoration: none;
					display: inline-block;
					&:hover {
						text-transform: uppercase;
					}
				}
			}
		}
	}
	.nav__toggler {
		background: transparent;
		border: 1px solid #000;
		padding: 0.5rem;
		display: none;
	}

	@media screen and (max-width: 768px) {
		// flex-direction: column;
		justify-content: space-between;
		.nav__toggler {
			display: inline-block;
		}
		.navbar {
			flex-direction: column;
			width: 100%;
			.navbar__nav {
				flex-direction: column;
				width: 100%;
				li {
					a {
						padding: 0.5rem 0;
					}
					&:hover {
						background: #ef0d33;
						a {
							color: #fff;
						}
					}
				}
			}
		}
	}
`;
