import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'none',
  },
  gridList: {
    width: 1200,
    height: 1004,
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
});


const tileData = [
    {
        img: "https://img.freepik.com/free-photo/homepage-concept-with-search-bar_23-2150040210.jpg?t=st=1709199475~exp=1709203075~hmac=13dd66224ba0e8aaadde7bf27ccc5fb5c77b77a17c824df0ac3aead567ea6f77&w=1380",
        title: 'Big search',
        author: 'author',
        featured: true,
    },
    {
        img: "https://img.freepik.com/free-photo/ui-ux-representations-with-laptop_23-2150201871.jpg?t=st=1709199410~exp=1709203010~hmac=432a38d4f00ef9eb6cc454d503274282a5186daef3085d74db147c90aa952cfa&w=1380",
        title: 'Many components',
        author: 'author',
        featured: false,
    },
    {
        img: "https://img.freepik.com/free-photo/front-view-man-suit-website-hosting-concept_23-2149406769.jpg?t=st=1709199563~exp=1709203163~hmac=0447262cfd5dd5d9d9b36f95806b74e0edb6aed757f3c35f034eabcd3a92ccb4&w=1380",
        title: 'Suitable for hosting',
        author: 'author',
        featured: false,
    },
    {
        img: "https://img.freepik.com/free-photo/html-system-websites-concept_23-2150323528.jpg?t=st=1709199703~exp=1709203303~hmac=4850a78f474e5e233b2f8eee8b605828adc68c15f7d19188561907b737c1aa62&w=1380",
        title: 'Web design leader',
        author: 'author',
        featured: false,
    },
    {
        img: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg?t=st=1709199308~exp=1709202908~hmac=a2b2b2731da4a3bee848cff381c1691cd83e9afdeef7860819d556b1b8e04266&w=1380",
        title: 'Perfect code',
        author: 'author',
        featured: false,
    },
    {
        img: "https://img.freepik.com/free-photo/man-using-digital-tablet-holding-stylus-pen-working-office_169016-47360.jpg?t=st=1709199817~exp=1709203417~hmac=ab42860364209590b44b6c7f38a18a447982266cd33bfc055b46df550d33f903&w=1380",
        title: 'For all screens',
        author: 'author',
        featured: false,
    },
    {
      img: "https://img.freepik.com/free-photo/programming-background-collage_23-2149901789.jpg?t=st=1709199908~exp=1709203508~hmac=50915eb04879910289ef89a8586aaaaf4086b224c8f9e95c60b32041e720c90b&w=1380",
      title: 'CSS master',
      author: 'author',
      featured: false,
  },
];
    

function AdvancedGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionIcon={
                <IconButton className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

AdvancedGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvancedGridList);