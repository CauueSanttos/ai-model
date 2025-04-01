# ai-model

# Generate Text

curl --request POST \
 --url 'http://localhost:3000/generate?model=gpt2' \
 --header 'Content-Type: application/json' \
 --data '{
"prompt": "Once upon a time in Brazil,"
}'

# Generate Image

curl --request POST \
 --url 'http://localhost:3000/generate-image?model=stabilityai%2Fstable-diffusion-2' \
 --header 'Content-Type: application/json' \
 --data '{
"prompt": "A vintage light green and white Volkswagen Kombi van, similar to the 1999 model, parked or driving on a coastal road near the beach. The van should have a white roof and bumpers, rounded headlights, and a boxy retro shape. Show the beach, palm trees, ocean waves, and blue sky in the background. The van is the main subject, centered in the frame. Photorealistic style, high detail, natural lighting."
}'
