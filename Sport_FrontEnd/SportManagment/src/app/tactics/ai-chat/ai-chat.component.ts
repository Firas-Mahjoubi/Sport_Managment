import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent {
  userMessage: string = '';
  messages: { sender: string, text: string }[] = [];
  loading: boolean = false; // Optional: Show loading spinner
  isChatOpen: boolean = true;

  async sendMessage() {
    if (this.userMessage.trim() === '') return;

    // Add user's message
    this.messages.push({ sender: 'user', text: this.userMessage });
    const question = this.userMessage;
    this.userMessage = '';
    this.loading = true;

    try {
      // 🔥 Call your Flask API here
      const response = await axios.post('http://localhost:5000/api/query', { query: question });

      // Access the real AI answer inside the structure
      const aiAnswer = response.data.response.choices[0].text.trim();

      // Add AI's real answer
      this.messages.push({ sender: 'ai', text: aiAnswer });
    } catch (error) {
      console.error('Error fetching AI response:', error);
      this.messages.push({ sender: 'ai', text: "Sorry, something went wrong! 🚨" });
    }

    this.loading = false;
    
  }


  // Close chat method to hide the chat window
  closeChat() {
    this.isChatOpen = false; // Close the chat window by setting the flag to false
  }
}
