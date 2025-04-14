import unittest
import chess
import itertools
from chess import Board, Color, Position, Piece, Pawn

class BoardTest(unittest.TestCase):

    def setUp(self):
        self.notation = [["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"],
                         ["WP", "WP", "WP", "WP",   "", "WP", "WP", "WP"], 
                         [  "",   "",   "",   "",   "",   "",   "",   ""],
                         [  "",   "",   "",   "", "WP",   "",   "",   ""],
                         [  "",   "",   "",   "", "BP",   "",   "",   ""],
                         [  "",   "",   "",   "",   "",   "",   "",   ""],
                         ["BP", "BP", "BP", "BP",   "", "BP", "BP", "BP"], 
                         ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"]]
        self.flat_notation = list(itertools.chain(*self.notation))
        self.num_pieces = len([square for square in self.flat_notation if square != ""])
        self.empty_board = Board()
        self.board = Board.from_notation(self.notation)

    def test_from_notation(self):
        for row, notation_row in enumerate(self.notation):
            for col, square in enumerate(notation_row):
                board_piece = self.board[row][col]
                if square == "":
                    self.assertEqual(board_piece, None)
                else:
                    self.assertEqual(Position(row, col), board_piece.position)
                    self.assertEqual(Color.from_notation(square[0]), board_piece.color)
                    self.assertEqual(Piece.from_notation(square[1]), type(board_piece))

    def test_to_notation(self):
        self.assertListEqual(self.notation, self.board.to_notation())
        self.assertListEqual([[""] * 8] * 8, self.empty_board.to_notation())

    def test_positions(self):
        # 64 distinct + in bounds must be all squares in the 8x8 board
        self.assertEqual(64, len(set(self.board.positions())))
        self.assertTrue(all(position.in_bounds for position in self.board.positions()))

    def test_squares(self):
        # 64 squares in an 8x8 board
        self.assertEqual(64, len(list(self.board.squares())))
        self.assertSetEqual(set(self.board.pieces()).union({None}), set(self.board.squares()))

    def test_pieces(self):
        self.assertEqual(self.num_pieces, len(list(self.board.pieces())))
        for piece in self.board.pieces():
            self.assertEqual(piece.position.row, piece.row)
            self.assertEqual(piece.position.col, piece.col)

    def test_white_pieces(self):
        white_pieces = set(self.board.white_pieces())
        self.assertEqual(16, len(white_pieces))

        for piece in white_pieces:
            self.assertTrue(piece.is_white)

        for piece in self.board.pieces():
            if piece.is_white:
                self.assertIn(piece, white_pieces)

    def test_black_pieces(self):
        black_pieces = set(self.board.black_pieces())
        self.assertEqual(16, len(black_pieces))

        for piece in black_pieces:
            self.assertTrue(piece.is_black)

        for piece in self.board.pieces():
            if piece.is_black:
                self.assertIn(piece, black_pieces)

    def test_add(self):
        board = Board()
        self.assertTrue(all(square == None for square in board.squares()))
        board.add(Color.white, Pawn, Position(3, 4))
        board.add(Color.black, Pawn, Position(6, 6))
        self.assertEqual(Color.white, board.at(Position(3, 4)).color)
        self.assertEqual(Pawn, type(board.at(Position(3, 4))))
        self.assertEqual(Color.black, board.at(Position(6, 6)).color)
        self.assertEqual(Pawn, type(board.at(Position(6, 6))))
        self.assertEqual(2, len(list(board.pieces())))
        for position in board.positions():
            if position not in (Position(3, 4), Position(6, 6)):
                self.assertIsNone(board.at(position))

    def test_at(self):
        for position in self.board.positions():
            self.assertIs(self.board[position.row][position.col], self.board.at(position))
        for piece in self.board.pieces():
            self.assertIs(piece, self.board.at(piece.position))

    def test_empty(self):
        self.assertTrue(all(self.empty_board.empty((row, col)) for row in range(8) for col in range(8)))

if __name__ == '__main__':
    unittest.main()
