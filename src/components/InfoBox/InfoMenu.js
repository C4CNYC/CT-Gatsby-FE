import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'gatsby-link';

const styles = (theme) => ({
    infoMenu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        listStyle: 'none',
        margin: 0,
        width: '100%'
    },
    link: {
        padding: '.5em',
        fontWeight: 300,
        textTransform: 'lowercase',
        color: theme.info.colors.menuLink,
        '&:hover': {
            color: theme.info.colors.menuLinkHover
        }
    }
});

const InfoMenu = (props) => {
    const { classes, pages, linkOnClick } = props;

    return (
        <nav className={classes.infoMenu}>
            {/*{pages.map((page, i) => {*/}
            {/*  const { fields, frontmatter } = page.node;*/}
            {/*  return (*/}
            {/*    <Link*/}
            {/*      key={fields.slug}*/}
            {/*      to={fields.slug}*/}
            {/*      onClick={linkOnClick}*/}
            {/*      className={classes.link}*/}
            {/*      data-shape="closed"*/}
            {/*    >*/}
            {/*      {frontmatter.menuTitle ? frontmatter.menuTitle : frontmatter.title}*/}
            {/*    </Link>*/}
            {/*  );*/}
            {/*})}*/}
            <Link
                to='/learn/'
                onClick={linkOnClick}
                className={classes.link}
                data-shape='open'
            >
                Learn
            </Link>
            <Link
                to='/about/'
                onClick={linkOnClick}
                className={classes.link}
                data-shape='open'
            >
                About
            </Link>
            <Link
                to='/contact/'
                onClick={linkOnClick}
                className={classes.link}
                data-shape='closed'
            >
                Contact
            </Link>
            <Link
                to='/profile/'
                onClick={linkOnClick}
                className={classes.link}
                data-shape='open'
            >
                Profile
            </Link>
        </nav>
    );
};

InfoMenu.propTypes = {
    pages: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    linkOnClick: PropTypes.func.isRequired
};

export default withStyles(styles)(InfoMenu);
