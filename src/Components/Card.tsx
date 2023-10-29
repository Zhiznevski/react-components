import { Component } from 'react';
import styles from './Card.module.css';
import Person from '../types/Person';

type CardProps = {
  character: Person;
};

export default class Card extends Component<CardProps> {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={this.props.character.image}
            alt={this.props.character.name}
          ></img>
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{this.props.character.name}</h3>
          <p className={styles.description}>{this.props.character.gender}</p>
        </div>
      </div>
    );
  }
}
