from tkinter import *
import tkinter.simpledialog as dialogs
import tkinter.messagebox as messages
from enum import Enum, unique
import sys
import chess
from chess import Position
import client
from client import GameConnection, MockGameConnection

PIECE_IMAGES = {
            "WK": "icons/white_king.gif",
            "WQ": "icons/white_queen.gif",
            "WR": "icons/white_rook.gif",
            "WN": "icons/white_knight.gif",
            "WB": "icons/white_bishop.gif",
            "WP": "icons/white_pawn.gif",
            "BK": "icons/black_king.gif",
            "BQ": "icons/black_queen.gif",
            "BR": "icons/black_rook.gif",
            "BN": "icons/black_knight.gif",
            "BB": "icons/black_bishop.gif",
            "BP": "icons/black_pawn.gif"
        }

EMPTY_IMAGE = "icons/empty.gif"
LIGHT_MOVABLE_IMAGE = "icons/light_blue.gif"
DARK_MOVABLE_IMAGE = "icons/dark_blue.gif"

REFRESH_RATE_MILLS = 5000

class GameWindow(Frame):
  
    def __init__(self, root, conn):
        Frame.__init__(self, root, background="white")   
        self.root = root
        self.init_ui()
        self.load_conn(conn)

    def init_ui(self):
        self.root.title("Chess!")

        toolbar = Menu(self.root)
        self.root.config(menu=toolbar)

        file_menu = Menu(toolbar)
        file_menu.add_command(label="New Local Game", command=self.new_local_game)
        file_menu.add_command(label="New Network Game", command=self.new_network_game)
        toolbar.add_cascade(label="File", menu=file_menu)

        game_menu = Menu(toolbar)
        game_menu.add_command(label="Reset Game", command=self.reset_game)
        toolbar.add_cascade(label="Game", menu=game_menu)

        # initialize current turn label
        self.turn_label = Label(self, text="Loading...")
        self.turn_label.grid(sticky=N+S+E+W, row=0, columnspan=8)

        # initialize buttons container
        self.grid(sticky=N+S+E+W)
        for index in range(9):
            self.rowconfigure(index, weight=1, minsize=60)
        for index in range(8):
            self.columnconfigure(index, weight=1, minsize=60)

        # grid of buttons corresponding to board squares
        self.buttons = [[None] * 8 for x in range(8)]
        self.selected = None

        # registers the refresh call
        self.root.after(REFRESH_RATE_MILLS, self.reload_clock)

    def load_conn(self, conn):
        self._conn = conn
        self.current_turn = conn.turn()
        self.reload_board()

    def new_local_game(self):
        self.load_conn(MockGameConnection())

    def new_network_game(self):
        url = dialogs.askstring("New Connection", "Enter the url")
        if not url.startswith("http://"):
            url = "http://" + url
        try:
            new_conn = GameConnection(url)
            self.load_conn(new_conn)
        except:
            messages.showerror("Connection Failure", "Could not load url: " + url)

    def reset_game(self):
        self._conn.reset()
        self.reload_board()

    def reload_clock(self):
        current_turn = self._conn.turn()
        if self.current_turn != current_turn:
            self.current_turn = current_turn
            self._conn.refresh()
            self.reset_all()
        # registers the refresh call again, forming a clock
        self.root.after(REFRESH_RATE_MILLS, self.reload_clock)

    @property
    def board(self):
        return self._conn.board()

    def reload_board(self):
        self.refresh_label()
        for row_num, row in enumerate(self.board.rows):
            for col_num, square in enumerate(row):
                button = SquareButton(self, self.buttons, row_num, col_num)
                button.grid(sticky=N+S+E+W, row=row_num + 1, column=col_num)
                self.buttons[row_num][col_num] = button

    def refresh_label(self):
        message = "Turn: " + str(self.current_turn["turn"]) 
        message += " Player: " + str(self.current_turn["current_player"]).capitalize()
        self.turn_label["text"] = message

    def reset_all(self):
        self.refresh_label()
        self.selected = None
        for button_row in self.buttons:
            for button in button_row:
                button.reset()

    def on_click(self, button):
        if button is self.selected or not self.selected and not button.empty:
            button.toggle_selected()
            self.selected = button if button.selected else None
            # reset if unclick
            if not button.selected:
                self.reset_all()
            else:
                for position in button.piece.possible_moves:
                    self.buttons[position.row][position.col].set_movable()
                for position in button.piece.possible_attacks:
                    self.buttons[position.row][position.col].set_attackable()
        if button.movable or button.attackable:
            self.current_turn = self._conn.move(self.selected.position, button.position)
            self.reset_all()


@unique
class State(Enum):
    blank = 1
    selected = 2
    movable = 3
    attackable = 4

class SquareButton(Label):

    def __init__(self, game_window, buttons, row, col):
        Label.__init__(self, game_window)
        self.game_window = game_window
        self.buttons = buttons
        self.row = row
        self.col = col
        self.state = State.blank

        self["highlightbackground"] = "black"
        self["highlightthickness"] = 1
        self.bind("<Button-1>", self.on_click)
        self.reset()

    def update_icon(self):
        square = self.board[self.row][self.col]
        image_name = PIECE_IMAGES[square.to_notation()] if square else EMPTY_IMAGE
        self.set_image(image_name)

    def reset(self):
        self.state = State.blank
        self["bg"] = "cornsilk3" if self.is_dark else "linen"
        self.update_icon()

    @property
    def board(self):
        return self.game_window.board

    @property
    def is_dark(self):
        return (self.row + self.col) % 2 == 0

    @property
    def selected(self):
        return self.state == State.selected

    @property
    def movable(self):
        return self.state == State.movable

    @property
    def attackable(self):
        return self.state == State.attackable

    @property
    def position(self):
        return Position(self.row, self.col)

    @property
    def piece(self):
        return self.board.at(self.position)

    @property
    def empty(self):
        return self.board.empty(self.position)

    def set_image(self, image_filename, *, image_cache=dict()):
        if image_filename not in image_cache:
            image_cache[image_filename] = PhotoImage(file=image_filename)
        self.image = image_cache[image_filename]
        self["image"] = self.image

    def set_selected(self):
        self.state = State.selected
        self["bg"] = "goldenrod" if self.is_dark else "pale goldenrod"

    def set_movable(self):
        self.state = State.movable
        self.set_image(DARK_MOVABLE_IMAGE if self.is_dark else LIGHT_MOVABLE_IMAGE)

    def set_attackable(self):
        self.state = State.attackable
        self["bg"] = "pink"

    def toggle_selected(self):
        if self.selected:
            self.reset()
        else:
            self.set_selected()

    def on_click(self, event):
        self.game_window.on_click(self)

        
if __name__ == '__main__':
    root = Tk()
    root.geometry("+700+200")
    root.rowconfigure(0, weight=1)
    root.columnconfigure(0, weight=1)

    if len(sys.argv) > 1:
        url = sys.argv[1]
        conn = GameConnection(url)
    else:
        conn = MockGameConnection()

    app = GameWindow(root, conn)

    root.mainloop()  
