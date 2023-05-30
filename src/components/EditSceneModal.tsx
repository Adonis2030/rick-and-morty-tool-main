import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface IScene {
  id: string;
  characters: string[];
  location: string;
  description: string;
}

interface EditSceneModalProps {
  show: boolean;
  scene: IScene;
  characters: string[];
  locations: string[];
  onSave: (updatedScene: IScene) => void;
  onClose: () => void;
}

const EditSceneModal: React.FC<EditSceneModalProps> = ({
  show,
  scene,
  characters,
  locations,
  onSave,
  onClose,
}) => {
  useEffect(() => {
    setUpdatedScene(scene);
  }, [scene]);
  
  const [updatedScene, setUpdatedScene] = useState<IScene>(scene);
  const [selectedCharacter, setSelectedCharacter] = useState("");

  const handleAddCharacter = () => {
    if (selectedCharacter) {
      if (updatedScene.characters.includes(selectedCharacter) === true) return;
      const updatedCharacters = [...updatedScene.characters, selectedCharacter];
      setUpdatedScene({ ...updatedScene, characters: updatedCharacters });
      setSelectedCharacter("");
    }
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const location = event.target.value;
    setUpdatedScene({ ...updatedScene, location });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const description = event.target.value;
    setUpdatedScene({ ...updatedScene, description });
  };

  const handleRemoveCharacter = (index: number) => {
    const updatedCharacters = updatedScene.characters.filter((_, i) => i !== index);
    setUpdatedScene({ ...updatedScene, characters: updatedCharacters });
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

  const handleSave = () => {
    onSave(updatedScene);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Scene</Modal.Title>
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
          {renderCharacterList(updatedScene.characters)}
        </div>
        <div className="mt-3">
          <label>Location:</label>
          <select
            className="form-control"
            value={updatedScene.location}
            onChange={handleLocationChange}
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
            value={updatedScene.description}
            onChange={handleDescriptionChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSceneModal;
