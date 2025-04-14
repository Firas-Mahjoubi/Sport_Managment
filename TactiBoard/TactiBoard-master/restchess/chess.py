from enum import Enum, unique
import itertools

STARTING_NOTATION = [["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"],
                     ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"], 
                     [  "",   "",   "",   "",   "",   "",   "",   ""],
                     [  "",   "",   "",   "",   "",   "",   "",   ""],
                     [  "",   "",   "",   "",   "",   "",   "",   ""],
                     [  "",   "",   "",   "",   "",   "",   "",   ""],
                     ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"], 
                     ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"]]
@unique
class Color(Enum):
    white = 1
    black = 2

    def __str__(self):
        return self.name

    def __repr__(self):
        return "chess.Color." + str(self)

    @classmethod
    def from_notation(constructor, notation):
        if notation.upper() == "W":
            return Color.white
        elif notation.upper() == "B":
            return Color.black
        else:
            raise Exception("Couldn't find color for notation: \"" + notation + "\"")

    def to_notation(self):
        if self is Color.white:
            return "W"
        else:
            return "B"



ROWS = ["1", "2", "3", "4", "5", "6", "7", "8"]
COLS = ["A", "B", "C", "D", "E", "F", "G", "H"]

class Position:

    def __init__(self, row, col):
        self.row = row
        self.col = col

    @classmethod
    def from_notation(constructor, notation):
        col_name, row_name = notation
        row = ROWS.index(row_name)
        col = COLS.index(col_name)
        return constructor(row, col)

    def __str__(self):
        return COLS[self.col] + ROWS[self.row]

    def __repr__(self):
        return "chess.Position(row=" + str(self.row) + ", col=" + str(self.col) + ")"

    def __eq__(self, other):
        return self.row == other.row and self.col == other.col

    def __hash__(self):
        return hash(self.row) ^ hash(self.col)

    def __iter__(self):
        yield self.row
        yield self.col

    def __add__(self, delta):
        drow, dcol = delta
        return Position(self.row + drow, self.col + dcol)

    def __sub__(self, other):
        row, col = other
        return (self.row - row, self.col - col)

    @property
    def in_bounds(self):
        return 0 <= self.row < 8 and 0 <= self.col < 8

    def iterator_up(self):
        return (Position(row, self.col) for row in range(self.row + 1, 8))

    def iterator_down(self):
        return (Position(row, self.col) for row in range(self.row - 1, -1, -1))

    def iterator_right(self):
        return (Position(self.row, col) for col in range(self.col + 1, 8))

    def iterator_left(self):
        return (Position(self.row, col) for col in range(self.col - 1, -1, -1))

    def iterator_upright(self):
        return (Position(row, col) for row, col in zip(range(self.row + 1, 8), range(self.col + 1, 8)))

    def iterator_upleft(self):
        return (Position(row, col) for row, col in zip(range(self.row + 1, 8), range(self.col - 1, -1, -1)))

    def iterator_downright(self):
        return (Position(row, col) for row, col in zip(range(self.row - 1, -1, -1), range(self.col + 1, 8)))

    def iterator_downleft(self):
        return (Position(row, col) for row, col in zip(range(self.row - 1, -1, -1), range(self.col - 1, -1, -1)))


class Board:

    def __init__(self):
        self.rows = [[None] * 8 for x in range(8)]

    @classmethod
    def from_notation(constructor, board_notation):
        board = constructor()
        for row, board_row in enumerate(board_notation):
            for col, square in enumerate(board_row):
                if square != "":
                    color_notation, piece_notation = square
                    color = Color.from_notation(color_notation)
                    piece_type = Piece.from_notation(piece_notation)
                    board.add(color, piece_type, Position(row, col))
        return board

    def to_notation(self):
        return [[piece.to_notation() if piece else "" for piece in row] for row in self.rows]

    def __getitem__(self, row):
        return self.rows[row]

    def positions(self):
        for row in range(8):
            for col in range(8):
                yield Position(row, col)

    def squares(self):
        for row in self.rows:
            yield from row

    def pieces(self):
        return (square for square in self.squares() if square)

    def white_pieces(self):
        return (piece for piece in self.pieces() if piece.is_white)

    def black_pieces(self):
        return (piece for piece in self.pieces() if piece.is_black)

    def add(self, color, piece_type, position):
        piece = piece_type(color, position, self)
        self.rows[position.row][position.col] = piece
        return piece

    def at(self, position):
        row, col = position
        return self.rows[row][col]

    def empty(self, position):
        return self.at(position) is None


class Piece:

    def __init__(self, color, position, board):
        self.color = color
        self.position = position
        self.board = board

    @classmethod
    def from_notation(constructor, piece_notation, *, TYPES_BY_NOTATION=None):
        # need to be lazy here to resolve circularity between Piece and other piece classes
        if not TYPES_BY_NOTATION:
            PIECE_TYPES = [King, Queen, Rook, Knight, Bishop, Pawn]
            TYPES_BY_NOTATION = {piece_type.NOTATION: piece_type for piece_type in PIECE_TYPES}
        return TYPES_BY_NOTATION[piece_notation.upper()]

    def __str__(self):
        return str(self.color).capitalize() + " " + self.NAME + ", " + str(self.position)

    def __repr__(self):
        return ("chess." + self.NAME + "(color=" + repr(self.color) + ", position=" + repr(self.position) + ")")

    def to_notation(self):
        return self.color.to_notation() + self.NOTATION

    @property
    def row(self):
        return self.position.row

    @property
    def col(self):
        return self.position.col

    @property
    def is_white(self):
        return self.color == Color.white

    @property
    def is_black(self):
        return self.color == Color.black

    def move_to(self, position):
        if self.board.empty(position) and not self.valid_move(position):
            raise Exception("cannot move there!")
        if not self.board.empty(position) and not self.valid_attack(position):
            raise Exception("cannot attack there!")

        self.board[self.row][self.col] = None
        self.board[position.row][position.col] = self
        self.position = position

    def valid_move(self, position):
        return position in self.possible_moves

    def valid_attack(self, position):
        return position in self.possible_attacks

    def _enemy_at(self, position):
        return not self.board.empty(position) and self.color != self.board.at(position).color

    def _stop_filter(self, positions, inclusive=False):
        done = not inclusive
        for position in positions:
            if position.in_bounds and self.board.empty(position):
                yield position
            elif not done:
                yield position
                done = True
            else:
                return

    def _enemy_filter(self, positions):
        return (position for position in positions if self._enemy_at(position))

                          
class Pawn(Piece):

    NAME = "Pawn"
    NOTATION = "P"

    # offsets from this pawn's position for its normal moves, double moves, and attacks
    MOVE_OFFSETS = {Color.white: [(1, 0)], Color.black: [(-1, 0)]}
    DOUBLE_MOVE_OFFSETS = {Color.white: [(1, 0), (2, 0)], Color.black: [(-1, 0), (-2, 0)]}
    ATTACK_OFFSETS = {Color.white: [(1, 1), (1, -1)], Color.black: [(-1, 1), (-1, -1)]}

    def _can_double_move(self):
        return (self.color, self.row) in [(Color.white, 1), (Color.black, 6)]

    @property
    def possible_moves(self):
        if self._can_double_move():
            moves = [self.position + offset for offset in Pawn.DOUBLE_MOVE_OFFSETS[self.color]]
        else:
            moves = [self.position + offset for offset in Pawn.MOVE_OFFSETS[self.color]]
        return list(self._stop_filter(moves))

    # TODO: support en passant
    @property
    def possible_attacks(self):
        attacks = [self.position + offset for offset in Pawn.ATTACK_OFFSETS[self.color]]
        return list(self._enemy_filter(attacks))


class Rook(Piece):

    NAME = "Rook"
    NOTATION = "R"

    @property
    def _move_iterators(self):
        return [self.position.iterator_up(),    self.position.iterator_down(),
                self.position.iterator_right(), self.position.iterator_left()]

    @property
    def possible_moves(self):
        return list(itertools.chain(*(self._stop_filter(moves) for moves in self._move_iterators)))

    @property
    def possible_attacks(self):
        in_range = itertools.chain(*(self._stop_filter(moves, inclusive=True) for moves in self._move_iterators))
        return list(self._enemy_filter(in_range))


class Bishop(Piece):

    NAME = "Bishop"
    NOTATION = "B"

    @property
    def _move_iterators(self):
        return [self.position.iterator_upright(),   self.position.iterator_upleft(),
                self.position.iterator_downright(), self.position.iterator_downleft()]

    @property
    def possible_moves(self):
        return list(itertools.chain(*(self._stop_filter(moves) for moves in self._move_iterators)))

    @property
    def possible_attacks(self):
        in_range = itertools.chain(*(self._stop_filter(moves, inclusive=True) for moves in self._move_iterators))
        return list(self._enemy_filter(in_range))


class Queen(Piece):

    NAME = "Queen"
    NOTATION = "Q"

    @property
    def _move_iterators(self):
        return [self.position.iterator_up(),        self.position.iterator_down(),
                self.position.iterator_right(),     self.position.iterator_left(),
                self.position.iterator_upright(),   self.position.iterator_upleft(),
                self.position.iterator_downright(), self.position.iterator_downleft()]

    @property
    def possible_moves(self):
        return list(itertools.chain(*(self._stop_filter(moves) for moves in self._move_iterators)))

    @property
    def possible_attacks(self):
        in_range = itertools.chain(*(self._stop_filter(moves, inclusive=True) for moves in self._move_iterators))
        return list(self._enemy_filter(in_range))


class King(Piece):

    NAME = "King"
    NOTATION = "K"

    MOVE_OFFSETS = [(1, 1), (1, 0), (1, -1), (0, 1), (0, -1), (-1, 1), (-1, 0), (-1, -1)]

    @property
    def _moves(self):
        positions = [self.position + offset for offset in King.MOVE_OFFSETS]
        return [position for position in positions if position.in_bounds]

    @property
    def possible_moves(self):
        return [position for position in self._moves if self.board.empty(position)]

    @property
    def possible_attacks(self):
        return list(self._enemy_filter(self._moves))


class Knight(Piece):

    NAME = "Knight"
    NOTATION = "N"

    MOVE_OFFSETS = [(2, 1), (2, -1), (1, 2), (1, -2), (-1, 2), (-1, -2), (-2, 1), (-2, -1)]

    @property
    def _moves(self):
        positions = [self.position + offset for offset in Knight.MOVE_OFFSETS]
        return [position for position in positions if position.in_bounds]

    @property
    def possible_moves(self):
        return [position for position in self._moves if self.board.empty(position)]

    @property
    def possible_attacks(self):
        return list(self._enemy_filter(self._moves))


