import React, { useState } from "react";
import "./style.css";
import { Modal, Button } from "react-bootstrap";

interface IScene {
  id: string;
  characters: string[];
  location: string;
  description: string;
}

interface AddSceneModalProps {
  show: boolean;
  characters: string[];
  locations: string[];
  onAddScene: (newScene: IScene) => void;
  onHide: () => void;
}

const AddSceneModal: React.FC<AddSceneModalProps> = ({
  show,
  characters,
  locations,
  onAddScene,
  onHide,
}) => {
  const [newScene, setNewScene] = useState<IScene>({
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    characters: [],
    location: "",
    description: "",
  });
  const [selectedCharacter, setSelectedCharacter] = useState("");

  const handleAddCharacter = () => {
    if (selectedCharacter) {
      if (newScene.characters.includes(selectedCharacter) === true) return;
      const updatedCharacters = [...newScene.characters, selectedCharacter];
      setNewScene({ ...newScene, characters: updatedCharacters });
      setSelectedCharacter("");
    }
  };

  const handleRemoveCharacter = (index: number) => {
    const updatedCharacters = newScene.characters.filter((_, i) => i !== index);
    setNewScene({ ...newScene, characters: updatedCharacters });
  };

  const handleSetLocation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const location = event.target.value;
    setNewScene({ ...newScene, location });
  };

  const handleSetDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const description = event.target.value;
    setNewScene({ ...newScene, description });
  };

  const handleSave = () => {
    onAddScene(newScene);
    setNewScene({ id:  Date.now().toString(36) + Math.random().toString(36).substr(2), characters: [], location: "", description: "" });
    onHide();
  };

  const renderCharacterList = (characters: string[]) => {
    return (
      <div className="character-list">
        {characters.map((character, index) => (
          <div className="character-badge" key={index}>
            <span className="character-name">{character}</span>
            <button
              className="btn btn-sm btn-danger character-remove"
              onClick={() => handleRemoveCharacter(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Scene</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>Characters:</label>
          <select
            className="form-control"
            value={selectedCharacter}
            onChange={(e) => setSelectedCharacter(e.target.value)}
          >
            <option value="">Select a character</option>
            {characters.map((character) => (
              <option key={character} value={character}>
                {character}
              </option>
            ))}
          </select>
          <Button
            className="btn btn-primary mt-2 mb-2"
            disabled={!selectedCharacter}
            onClick={handleAddCharacter}
          >
            Add Character
          </Button>
          {renderCharacterList(newScene.characters)}
        </div>
        <div className="mt-3">
          <label>Location:</label>
          <select
            className="form-control"
            value={newScene.location}
            onChange={handleSetLocation}
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            value={newScene.description}
            onChange={handleSetDescription}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Scene
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSceneModal;
